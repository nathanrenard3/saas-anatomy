"use client";

import { useState } from "react";
import { Lightbulb, Wand2, Copy, Check, Loader2, ArrowDown } from "lucide-react";
import type { CriterionResult } from "@/lib/analyzer/types";

const ELEMENT_TYPE_LABELS: Record<string, string> = {
  heading: "Titre principal",
  subheading: "Sous-titre",
  cta: "Bouton d'action",
  value_proposition: "Proposition de valeur",
  section: "Section de contenu",
  meta_description: "Meta description",
};

interface AnalyzerScoreCardProps {
  criterion: CriterionResult;
  index: number;
  isBlurred?: boolean;
  rewritesLoading?: boolean;
}

function getScoreBg(score: number): string {
  if (score >= 7) return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
  if (score >= 5) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
  return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1 rounded hover:bg-muted transition-colors"
      title="Copier"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

export function AnalyzerScoreCard({
  criterion,
  index,
  isBlurred,
  rewritesLoading,
}: AnalyzerScoreCardProps) {
  const hasRewrites =
    criterion.rewrite_suggestions &&
    criterion.rewrite_suggestions.length > 0;

  return (
    <div
      className={`relative rounded-xl border border-border bg-card p-5 space-y-3 ${
        isBlurred ? "select-none pointer-events-none" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm text-muted-foreground font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-semibold text-foreground truncate">
            {criterion.nom}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className={`px-2.5 py-1 rounded-md text-sm font-bold border ${getScoreBg(criterion.score)}`}>
            {criterion.score}/10
          </div>
        </div>
      </div>

      {/* Explanation */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {criterion.explication}
      </p>

      {/* Recommendation */}
      <div className="flex gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          {criterion.recommandation}
        </p>
      </div>

      {/* Elements found */}
      {criterion.elements_trouves.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {criterion.elements_trouves.map((el, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >
              {el}
            </span>
          ))}
        </div>
      )}

      {/* Rewrite loading state */}
      {criterion.score < 7 && rewritesLoading && (
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">
            Génération des suggestions de réécriture...
          </span>
        </div>
      )}

      {/* Rewrite suggestions */}
      {hasRewrites && (
        <div className="relative mt-4 rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 via-background to-primary/3 overflow-hidden dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
          {/* Decorative blurred circles */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-primary/10 bg-linear-to-r from-primary/8 via-transparent to-transparent">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20 shadow-sm shadow-primary/10">
              <Wand2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-tight">
                Propositions d&apos;amélioration
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Suggestions de réécriture basées sur votre contenu actuel
              </p>
            </div>
          </div>

          {/* Suggestions list */}
          <div className="relative p-5 space-y-4">
            {criterion.rewrite_suggestions!.map((suggestion, i) => (
              <div
                key={i}
                className="space-y-3 p-4 rounded-xl bg-card border border-border/80"
              >
                {/* Before */}
                <div className="rounded-lg bg-muted/50 border border-border p-3.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      Actuellement
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-through decoration-red-400/50 decoration-2">
                    {suggestion.before}
                  </p>
                </div>

                {/* Arrow transition */}
                <div className="flex items-center justify-center py-0.5">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-linear-to-r from-transparent to-primary/30" />
                    <ArrowDown className="w-3.5 h-3.5 text-primary/50" />
                    <div className="h-px w-8 bg-linear-to-l from-transparent to-primary/30" />
                  </div>
                </div>

                {/* After */}
                <div className="rounded-lg bg-linear-to-br from-primary/5 via-green-500/5 to-primary/3 border border-green-500/20 p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                          Suggestion
                        </span>
                      </div>
                      <p className="text-sm text-foreground font-medium leading-relaxed">
                        {suggestion.after}
                      </p>
                    </div>
                    <CopyButton text={suggestion.after} />
                  </div>
                </div>

                {/* Justification */}
                <p className="text-xs text-muted-foreground leading-relaxed pt-1 px-0.5">
                  {suggestion.justification}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
