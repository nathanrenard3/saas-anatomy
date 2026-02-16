export interface ScrapedContent {
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  h3: string[];
  ctaButtons: string[];
  bodyText: string;
  hasTestimonials: boolean;
  hasLogos: boolean;
  hasPricing: boolean;
  hasFAQ: boolean;
  formCount: number;
  imageAltTexts: string[];
  linkTexts: string[];
}

export interface RewriteSuggestion {
  element_type:
    | "heading"
    | "cta"
    | "value_proposition"
    | "section"
    | "meta_description"
    | "subheading";
  before: string;
  after: string;
  justification: string;
}

export interface CriterionResult {
  id: string;
  nom: string;
  score: number;
  explication: string;
  recommandation: string;
  elements_trouves: string[];
  rewrite_suggestions?: RewriteSuggestion[];
}

export interface AnalysisResult {
  id: string;
  url: string;
  domain: string;
  score_global: number;
  resume: string;
  criteres: CriterionResult[];
  points_forts: string[];
  points_faibles: string[];
  created_at: string;
  isUnlocked: boolean;
  remaining_analyses: number;
}

export type AnalysisState =
  | { status: "idle" }
  | { status: "analyzing"; step: number }
  | { status: "complete"; result: AnalysisResult }
  | { status: "error"; message: string };
