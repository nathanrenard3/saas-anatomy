"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { AnalyzerOverallScore } from "./analyzer-overall-score";
import { AnalyzerScoreCard } from "./analyzer-score-card";
import { AnalyzerNewsletterGate } from "./analyzer-newsletter-gate";
import { ShareButton } from "./share-button";
import type { AnalysisResult, CriterionResult, RewriteSuggestion } from "@/lib/analyzer/types";

const FREE_CRITERIA_COUNT = 4;

interface AnalyzerResultsProps {
  result: AnalysisResult;
  isUnlocked: boolean;
  onUnlock: () => void;
  hideShare?: boolean;
}

export function AnalyzerResults({
  result,
  isUnlocked,
  onUnlock,
  hideShare,
}: AnalyzerResultsProps) {
  const t = useTranslations("analyzer");
  const locale = useLocale();
  const [rewritesLoading, setRewritesLoading] = useState(false);
  const [rewritesLoaded, setRewritesLoaded] = useState(false);
  const [rewritesError, setRewritesError] = useState(false);
  const [criteriaWithRewrites, setCriteriaWithRewrites] = useState<CriterionResult[]>(result.criteres);

  const fetchRewrites = useCallback(async () => {
    setRewritesLoading(true);
    setRewritesError(false);
    try {
      const res = await fetch("/api/tools/analyze/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId: result.id, locale }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Rewrite API error:", res.status, errorData);
        setRewritesError(true);
        return;
      }

      const data = await res.json();

      if (!data.suggestions || data.suggestions.length === 0) {
        // No weak criteria — nothing to rewrite
        return;
      }

      const merged = result.criteres.map((criterion) => {
        const match = data.suggestions.find(
          (s: { criterion_id: string; rewrites: RewriteSuggestion[] }) =>
            s.criterion_id === criterion.id || s.criterion_id === criterion.nom
        );
        if (match) {
          return { ...criterion, rewrite_suggestions: match.rewrites };
        }
        return criterion;
      });
      setCriteriaWithRewrites(merged);
    } catch (err) {
      console.error("Failed to load rewrites:", err);
      setRewritesError(true);
    } finally {
      setRewritesLoading(false);
      setRewritesLoaded(true);
    }
  }, [result.id, result.criteres, locale]);

  const retryRewrites = useCallback(() => {
    setRewritesLoaded(false);
    setRewritesError(false);
    fetchRewrites();
  }, [fetchRewrites]);

  useEffect(() => {
    if (isUnlocked && !rewritesLoaded && !rewritesLoading) {
      fetchRewrites();
    }
  }, [isUnlocked, rewritesLoaded, rewritesLoading, fetchRewrites]);

  // Free criteria: strip rewrites only if not unlocked
  const freeCriteria = isUnlocked
    ? criteriaWithRewrites.slice(0, FREE_CRITERIA_COUNT)
    : criteriaWithRewrites
        .slice(0, FREE_CRITERIA_COUNT)
        .map((c) => ({ ...c, rewrite_suggestions: undefined }));

  const gatedCriteria = criteriaWithRewrites.slice(FREE_CRITERIA_COUNT);

  return (
    <section className="px-4 py-12">
      <div className="container mx-auto max-w-3xl space-y-10">
        {/* Header with score + summary */}
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-2xl border border-border bg-card">
            <AnalyzerOverallScore score={result.score_global} />
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h2 className="text-xl font-bold">{t("resultsTitle")}</h2>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {result.domain}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.resume}
              </p>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">
                      {t("strengths")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.points_forts.map((point, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-green-500/30 text-green-700 dark:text-green-400">
                        {point}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <ThumbsDown className="w-3.5 h-3.5 text-orange-600" />
                    <span className="text-xs font-medium text-orange-700 dark:text-orange-400">
                      {t("weaknesses")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.points_faibles.map((point, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-orange-500/30 text-orange-700 dark:text-orange-400">
                        {point}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Share link */}
        {!hideShare && (
          <BlurFade delay={0.15} inView>
            <div className="flex justify-center">
              <ShareButton
                path={`/tools/landing-page-analyzer/report/${result.id}`}
                twitterText={t("twitterShareText", { domain: result.domain, score: result.score_global })}
              />
            </div>
          </BlurFade>
        )}

        {/* Free criteria */}
        <div className="space-y-4">
          <BlurFade delay={0.2} inView>
            <h3 className="text-lg font-semibold">
              {t("detailedAnalysis")}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {t("criteriaCount", { count: result.criteres.length })}
              </span>
            </h3>
          </BlurFade>

          {freeCriteria.map((criterion, index) => (
            <BlurFade key={criterion.id} delay={0.3 + index * 0.1} inView>
              <AnalyzerScoreCard
                criterion={criterion}
                index={index}
                rewritesLoading={isUnlocked ? rewritesLoading : undefined}
              />
            </BlurFade>
          ))}
        </div>

        {/* Newsletter gate + gated criteria */}
        {!isUnlocked && (
          <AnalyzerNewsletterGate
            analysisId={result.id}
            onUnlock={onUnlock}
          />
        )}

        {/* Rewrite error banner */}
        {rewritesError && isUnlocked && (
          <div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
              <p className="text-sm text-muted-foreground">
                {t("rewritesError")}
              </p>
            </div>
            <button
              onClick={retryRewrites}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-card hover:bg-muted transition-colors shrink-0"
            >
              <RefreshCw className="w-3 h-3" />
              {t("retry")}
            </button>
          </div>
        )}

        <div className="relative space-y-4">
          {/* Blur overlay when locked */}
          {!isUnlocked && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="w-full h-full backdrop-blur-md bg-background/30 rounded-xl" />
            </div>
          )}

          {gatedCriteria.map((criterion, index) => {
            const globalIndex = FREE_CRITERIA_COUNT + index;
            return isUnlocked ? (
              <BlurFade
                key={criterion.id}
                delay={index * 0.1}
                inView
              >
                <AnalyzerScoreCard
                  criterion={criterion}
                  index={globalIndex}
                  rewritesLoading={rewritesLoading}
                />
              </BlurFade>
            ) : (
              <div key={criterion.id}>
                <AnalyzerScoreCard
                  criterion={criterion}
                  index={globalIndex}
                  isBlurred
                />
              </div>
            );
          })}
        </div>

        {/* Remaining analyses info */}
        {result.remaining_analyses >= 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {result.remaining_analyses > 0
              ? t("remainingAnalyses", { count: result.remaining_analyses })
              : t("noRemainingAnalyses")}
          </p>
        )}
      </div>
    </section>
  );
}
