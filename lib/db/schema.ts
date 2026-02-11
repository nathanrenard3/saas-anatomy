import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analyses = pgTable(
  "analyses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    url: text("url").notNull(),
    domain: text("domain").notNull(),
    scrapedContent: jsonb("scraped_content"),
    analysisResult: jsonb("analysis_result").notNull(),
    overallScore: integer("overall_score").notNull(),
    leadId: uuid("lead_id").references(() => leads.id),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_analyses_ip_created").on(table.ipAddress, table.createdAt),
    index("idx_analyses_lead_id").on(table.leadId),
  ]
);
