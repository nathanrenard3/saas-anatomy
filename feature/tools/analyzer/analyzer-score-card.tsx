import { Lightbulb } from "lucide-react";
import type { CriterionResult } from "@/lib/analyzer/types";

interface AnalyzerScoreCardProps {
  criterion: CriterionResult;
  index: number;
  isBlurred?: boolean;
}

function getScoreBg(score: number): string {
  if (score >= 8) return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
  if (score >= 5) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
  return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
}

export function AnalyzerScoreCard({ criterion, index, isBlurred }: AnalyzerScoreCardProps) {
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
    </div>
  );
}
