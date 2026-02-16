import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import {
  OgWrapper,
  OgBackground,
  OgCornerBrackets,
  OgLogo,
  OgBottomBar,
  loadOgAssets,
  ogResponseOptions,
  resolveLocale,
  truncate,
  PRIMARY,
  PRIMARY_12,
  TEXT,
  TEXT_MUTED,
  TEXT_SUBTLE,
} from "@/lib/og/shared";

export const runtime = "edge";

const bottomI18n = {
  fr: "Lire sur",
  en: "Read on",
} as const;

function formatDate(dateStr: string, locale: "fr" | "en"): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> }
) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const baseUrl = new URL(request.url).origin;

  const [post, assets] = await Promise.all([
    getPostBySlug(slug, locale),
    loadOgAssets(baseUrl),
  ]);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const { bgImageData, logoData, geistRegular, geistBold } = assets;
  const tags = (post.tags ?? []).slice(0, 3);
  const date = post.date ? formatDate(post.date, locale) : "";
  const readingTime =
    locale === "fr"
      ? `${post.readingTime} min de lecture`
      : `${post.readingTime} min read`;

  return new ImageResponse(
    (
      <OgWrapper>
        <OgBackground bgImageData={bgImageData} />
        <OgCornerBrackets />

        <OgLogo logoData={logoData} />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 52px",
            gap: 20,
            position: "relative",
          }}
        >
          {/* Tag pills */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 8 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 14px",
                    borderRadius: 20,
                    border: `1px solid ${PRIMARY_12}`,
                    backgroundColor: "rgba(19, 71, 230, 0.04)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: PRIMARY,
                    }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Post title */}
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: TEXT,
              maxWidth: 900,
            }}
          >
            {truncate(post.title, 80)}
          </span>

          {/* Excerpt */}
          {post.excerpt && (
            <span
              style={{
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.4,
                color: TEXT_MUTED,
                maxWidth: 750,
              }}
            >
              {truncate(post.excerpt, 120)}
            </span>
          )}

          {/* Date + reading time */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {date && (
              <span
                style={{ fontSize: 14, fontWeight: 400, color: TEXT_SUBTLE }}
              >
                {date}
              </span>
            )}
            {date && (
              <span style={{ fontSize: 14, color: TEXT_SUBTLE }}>
                {"\u00B7"}
              </span>
            )}
            <span
              style={{ fontSize: 14, fontWeight: 400, color: TEXT_SUBTLE }}
            >
              {readingTime}
            </span>
          </div>
        </div>

        <OgBottomBar text={bottomI18n[locale]} domain="saas-anatomy.com" />
      </OgWrapper>
    ),
    ogResponseOptions(geistRegular, geistBold, 86400)
  );
}
