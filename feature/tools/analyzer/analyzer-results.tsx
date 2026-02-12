"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { AnalyzerOverallScore } from "./analyzer-overall-score";
import { AnalyzerScoreCard } from "./analyzer-score-card";
import { AnalyzerNewsletterGate } from "./analyzer-newsletter-gate";
import { ShareButton } from "./share-button";
import type { AnalysisResult } from "@/lib/analyzer/types";

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
  const freeCriteria = result.criteres.slice(0, FREE_CRITERIA_COUNT);
  const gatedCriteria = result.criteres.slice(FREE_CRITERIA_COUNT);

  return (
    <section className="px-4 py-12">
      <div className="container mx-auto max-w-3xl space-y-10">
        {/* Header with score + summary */}
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-2xl border border-border bg-card">
            <AnalyzerOverallScore score={result.score_global} />
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Résultat de l&apos;analyse</h2>
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
                      Points forts
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
                      Points faibles
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
                twitterText={`Mon site ${result.domain} a obtenu un score de ${result.score_global}/100 en audit copywriting !`}
              />
            </div>
          </BlurFade>
        )}

        {/* Free criteria */}
        <div className="space-y-4">
          <BlurFade delay={0.2} inView>
            <h3 className="text-lg font-semibold">
              Analyse détaillée
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({result.criteres.length} critères)
              </span>
            </h3>
          </BlurFade>

          {freeCriteria.map((criterion, index) => (
            <BlurFade key={criterion.id} delay={0.3 + index * 0.1} inView>
              <AnalyzerScoreCard criterion={criterion} index={index} />
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
              ? `Il te reste ${result.remaining_analyses} analyse${result.remaining_analyses > 1 ? "s" : ""} aujourd'hui.`
              : "Tu as utilisé toutes tes analyses du jour. Reviens demain !"}
          </p>
        )}
      </div>
    </section>
  );
}
