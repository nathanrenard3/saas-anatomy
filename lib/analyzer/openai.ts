import OpenAI from "openai";
import { buildAnalysisPrompt } from "./prompt";
import { buildRewritePrompt } from "./rewrite-prompt";
import type { ScrapedContent, CriterionResult, RewriteSuggestion } from "./types";

let _openai: OpenAI | null = null;

function getOpenAI() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

interface AIAnalysisResult {
  url: string;
  domain: string;
  score_global: number;
  resume: string;
  criteres: Array<{
    id: string;
    nom: string;
    score: number;
    explication: string;
    recommandation: string;
    elements_trouves: string[];
  }>;
  points_forts: string[];
  points_faibles: string[];
}

export async function analyzeContent(
  scraped: ScrapedContent,
  url: string,
  locale: string = "fr"
): Promise<AIAnalysisResult> {
  const { systemPrompt, userMessage } = buildAnalysisPrompt(scraped, url, locale);

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.3,
    max_tokens: 4000,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("openai:empty-response");

  const parsed = JSON.parse(content) as AIAnalysisResult;

  // Validate basic structure
  if (!parsed.criteres || parsed.criteres.length !== 10) {
    throw new Error("openai:invalid-structure");
  }

  if (typeof parsed.score_global !== "number" || parsed.score_global < 0 || parsed.score_global > 100) {
    throw new Error("openai:invalid-score");
  }

  return parsed;
}

export interface RewriteResult {
  suggestions: Array<{
    criterion_id: string;
    rewrites: RewriteSuggestion[];
  }>;
}

export async function generateRewrites(
  weakCriteria: CriterionResult[],
  scraped: ScrapedContent,
  url: string,
  locale: string = "fr"
): Promise<RewriteResult> {
  const { systemPrompt, userMessage } = buildRewritePrompt(
    weakCriteria,
    scraped,
    url,
    locale
  );

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.5,
    max_tokens: 3000,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("openai:empty-rewrite-response");

  const parsed = JSON.parse(content) as RewriteResult;

  if (!parsed.suggestions || !Array.isArray(parsed.suggestions)) {
    throw new Error("openai:invalid-rewrite-structure");
  }

  return parsed;
}
