import * as cheerio from "cheerio";
import type { ScrapedContent } from "./types";

const BODY_TEXT_MAX_LENGTH = 4000;
const FETCH_TIMEOUT_MS = 10_000;

const BLOCKED_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
];

function isPrivateIP(hostname: string): boolean {
  if (BLOCKED_HOSTS.includes(hostname)) return true;
  if (hostname.startsWith("10.")) return true;
  if (hostname.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) return true;
  return false;
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim();
}

function matchesAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

export async function scrapeUrl(url: string): Promise<ScrapedContent> {
  const parsed = new URL(url);

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("scrape:invalid-protocol");
  }

  if (isPrivateIP(parsed.hostname)) {
    throw new Error("scrape:private-ip");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let html: string;
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SaaSAnatomyBot/1.0; +https://saas-anatomy.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`scrape:http-${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      throw new Error("scrape:not-html");
    }

    html = await response.text();
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("timeout");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  const $ = cheerio.load(html);

  // Remove script, style, noscript elements before text extraction
  $("script, style, noscript, svg, iframe").remove();

  const title = $("title").first().text().trim();
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || "";

  const h1 = $("h1")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);

  const h2 = $("h2")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);

  const h3 = $("h3")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);

  // Extract CTA-like elements
  const ctaButtons: string[] = [];
  $("button, a[role='button'], [class*='btn'], [class*='cta'], [class*='button'], input[type='submit']").each(
    (_, el) => {
      const text = $(el).text().trim();
      if (text && text.length < 100) ctaButtons.push(text);
    }
  );

  const linkTexts = $("a")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((t) => t && t.length > 1 && t.length < 100)
    .slice(0, 30);

  const imageAltTexts = $("img")
    .map((_, el) => $(el).attr("alt")?.trim())
    .get()
    .filter(Boolean)
    .slice(0, 20);

  const formCount = $("form").length;

  // Heuristic detection of sections
  const allHtml = $.html().toLowerCase();
  const allClasses = $("[class]")
    .map((_, el) => $(el).attr("class") || "")
    .get()
    .join(" ")
    .toLowerCase();
  const allIds = $("[id]")
    .map((_, el) => $(el).attr("id") || "")
    .get()
    .join(" ")
    .toLowerCase();
  const combined = allClasses + " " + allIds;

  const hasTestimonials = matchesAny(combined, [
    "testimonial",
    "review",
    "temoignage",
    "avis",
    "témoignage",
  ]);

  const hasLogos = matchesAny(combined, [
    "logo",
    "client",
    "partenaire",
    "partner",
    "trust",
    "brand",
    "company",
  ]);

  const hasPricing = matchesAny(combined, [
    "pricing",
    "tarif",
    "prix",
    "price",
    "plan",
  ]);

  const hasFAQ = matchesAny(combined, ["faq", "question", "accordion"]) ||
    allHtml.includes('"@type":"faqpage"') ||
    allHtml.includes('"@type": "faqpage"');

  // Extract clean body text
  const bodyText = cleanText($("body").text()).slice(0, BODY_TEXT_MAX_LENGTH);

  if (bodyText.length < 50) {
    throw new Error("scrape:empty-page");
  }

  return {
    title,
    metaDescription,
    h1,
    h2,
    h3,
    ctaButtons: [...new Set(ctaButtons)].slice(0, 15),
    bodyText,
    hasTestimonials,
    hasLogos,
    hasPricing,
    hasFAQ,
    formCount,
    imageAltTexts,
    linkTexts,
  };
}
