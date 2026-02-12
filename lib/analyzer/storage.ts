import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { analyses } from "@/lib/db/schema";
import type { ScrapedContent } from "./types";

interface StoreAnalysisParams {
  url: string;
  domain: string;
  scrapedContent: ScrapedContent;
  analysisResult: unknown;
  overallScore: number;
  leadId: string | null;
  ipAddress: string;
}

export async function storeAnalysis(params: StoreAnalysisParams) {
  const db = getDb();
  const [inserted] = await db
    .insert(analyses)
    .values(params)
    .returning({ id: analyses.id, createdAt: analyses.createdAt });

  return inserted;
}

export async function getAnalysisById(id: string) {
  const db = getDb();
  const result = await db
    .select({
      id: analyses.id,
      url: analyses.url,
      domain: analyses.domain,
      analysisResult: analyses.analysisResult,
      overallScore: analyses.overallScore,
      createdAt: analyses.createdAt,
    })
    .from(analyses)
    .where(eq(analyses.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}
