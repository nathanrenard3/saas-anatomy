import OpenAI from "openai";
import { buildAnalysisPrompt } from "./prompt";
import type { ScrapedContent } from "./types";

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
  grade_global: "A" | "B" | "C" | "D" | "F";
  resume: string;
  criteres: Array<{
    id: string;
    nom: string;
    score: number;
    grade: "A" | "B" | "C" | "D" | "F";
    explication: string;
    recommandation: string;
    elements_trouves: string[];
  }>;
  points_forts: string[];
  points_faibles: string[];
}

export async function analyzeContent(
  scraped: ScrapedContent,
  url: string
): Promise<AIAnalysisResult> {
  const { systemPrompt, userMessage } = buildAnalysisPrompt(scraped, url);

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
