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
