import { getDb } from "@/lib/db";
import { analyses } from "@/lib/db/schema";
import { eq, gte, and, count } from "drizzle-orm";

const MAX_ANALYSES_PER_DAY = 3;

export async function checkRateLimit(ipAddress: string): Promise<{
  allowed: boolean;
  remaining: number;
}> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const db = getDb();
  const result = await db
    .select({ total: count() })
    .from(analyses)
    .where(
      and(
        eq(analyses.ipAddress, ipAddress),
        gte(analyses.createdAt, twentyFourHoursAgo)
      )
    );

  const used = result[0]?.total ?? 0;

  return {
    allowed: used < MAX_ANALYSES_PER_DAY,
    remaining: Math.max(0, MAX_ANALYSES_PER_DAY - used),
  };
}
