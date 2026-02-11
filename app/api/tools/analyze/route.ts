import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { scrapeUrl } from "@/lib/analyzer/scraper";
import { analyzeContent } from "@/lib/analyzer/openai";
import { checkRateLimit } from "@/lib/analyzer/rate-limit";
import { parseUrl, getClientIp, mapScrapeError } from "@/lib/analyzer/errors";
import { findLeadByEmail } from "@/lib/analyzer/lead";
import { storeAnalysis } from "@/lib/analyzer/storage";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    const parsed = parseUrl(url);
    if (!parsed) {
      return NextResponse.json(
        { error: "L'URL fournie n'est pas valide." },
        { status: 400 }
      );
    }

    const ip = getClientIp(request.headers);

    const { allowed, remaining } = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Limite atteinte (5/jour). Revenez demain !" },
        { status: 429 }
      );
    }

    const cookieStore = await cookies();
    const leadEmail = cookieStore.get("lead_email")?.value;
    let leadId: string | null = null;
    let isUnlocked = false;

    if (leadEmail) {
      const lead = await findLeadByEmail(leadEmail);
      if (lead) {
        leadId = lead.id;
        isUnlocked = true;
      }
    }

    let scraped;
    try {
      scraped = await scrapeUrl(url);
    } catch (error: unknown) {
      return mapScrapeError(error);
    }

    let analysis;
    try {
      analysis = await analyzeContent(scraped, url);
    } catch {
      return NextResponse.json(
        { error: "L'analyse a échoué. Réessayez dans quelques instants." },
        { status: 502 }
      );
    }

    const inserted = await storeAnalysis({
      url,
      domain: parsed.hostname,
      scrapedContent: scraped,
      analysisResult: analysis,
      overallScore: analysis.score_global,
      leadId,
      ipAddress: ip,
    });

    return NextResponse.json({
      ...analysis,
      id: inserted.id,
      created_at: inserted.createdAt,
      isUnlocked,
      remaining_analyses: remaining - 1,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'analyse." },
      { status: 500 }
    );
  }
}
