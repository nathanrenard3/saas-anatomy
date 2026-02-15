import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAnalysisById, storeRewrites } from "@/lib/analyzer/storage";
import { findLeadByEmail } from "@/lib/analyzer/lead";
import { generateRewrites } from "@/lib/analyzer/openai";
import { getWeakCriteria } from "@/lib/analyzer/rewrite-prompt";
import type { CriterionResult, ScrapedContent } from "@/lib/analyzer/types";

export async function POST(request: NextRequest) {
  try {
    const { analysisId, locale } = await request.json();

    if (!analysisId) {
      return NextResponse.json(
        { error: "missingAnalysisId" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const leadEmail = cookieStore.get("lead_email")?.value;
    if (!leadEmail) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    const lead = await findLeadByEmail(leadEmail);
    if (!lead) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    const analysis = await getAnalysisById(analysisId);
    if (!analysis) {
      return NextResponse.json(
        { error: "analysisNotFound" },
        { status: 404 }
      );
    }

    const result = analysis.analysisResult as {
      criteres: CriterionResult[];
    };

    // Return cached rewrites if they exist and have valid IDs
    if (analysis.rewriteSuggestions && Array.isArray(analysis.rewriteSuggestions)) {
      const cached = analysis.rewriteSuggestions as Array<{ criterion_id: string }>;
      const criterionIds = new Set(result.criteres.map((c) => c.id));
      const cacheValid = cached.length === 0 || cached.some((s) => criterionIds.has(s.criterion_id));

      if (cacheValid) {
        return NextResponse.json({
          suggestions: analysis.rewriteSuggestions,
        });
      }
      // Cache has stale IDs (e.g. French names instead of kebab-case) — regenerate
    }
    const scraped = analysis.scrapedContent as ScrapedContent | null;

    if (!scraped) {
      return NextResponse.json({
        suggestions: [],
      });
    }

    const weakCriteria = getWeakCriteria(result.criteres);

    if (weakCriteria.length === 0) {
      await storeRewrites(analysisId, []);
      return NextResponse.json({ suggestions: [] });
    }

    const rewrites = await generateRewrites(
      weakCriteria,
      scraped,
      analysis.url,
      locale
    );

    await storeRewrites(analysisId, rewrites.suggestions);

    return NextResponse.json({ suggestions: rewrites.suggestions });
  } catch (error) {
    console.error("Rewrite error:", error);
    return NextResponse.json(
      { error: "rewriteFailed" },
      { status: 502 }
    );
  }
}
