import { getDb } from "@/lib/db";
import { leads, analyses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function findLeadByEmail(email: string): Promise<{ id: string } | null> {
  const db = getDb();
  const result = await db
    .select({ id: leads.id })
    .from(leads)
    .where(eq(leads.email, email))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function findOrCreateLead(email: string): Promise<string> {
  const existing = await findLeadByEmail(email);
  if (existing) return existing.id;

  const db = getDb();
  const [newLead] = await db
    .insert(leads)
    .values({ email })
    .returning({ id: leads.id });

  return newLead.id;
}

export async function linkLeadToAnalysis(analysisId: string, leadId: string): Promise<void> {
  const db = getDb();
  await db
    .update(analyses)
    .set({ leadId })
    .where(eq(analyses.id, analysisId));
}
