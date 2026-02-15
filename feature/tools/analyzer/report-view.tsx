"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnalyzerResults } from "./analyzer-results";
import type { AnalysisResult } from "@/lib/analyzer/types";

interface ReportViewProps {
  result: AnalysisResult;
  isUnlocked: boolean;
}

export function ReportView({
  result,
  isUnlocked: initialUnlocked,
}: ReportViewProps) {
  const t = useTranslations("analyzer");
  const [isUnlocked, setIsUnlocked] = useState(initialUnlocked);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  const twitterText = t("twitterShareText", { domain: result.domain, score: result.score_global });

  return (
    <>
      <section className="px-4 pt-16 pb-4 md:pt-20 md:pb-6">
        <div className="container mx-auto max-w-3xl text-center space-y-3">
          <BlurFade delay={0.1} inView>
            <p className="text-sm text-muted-foreground">
              {t("reportLabel")}
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t.rich("analysisOf", {
                highlight: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
                domain: result.domain,
              })}
            </h1>
          </BlurFade>
        </div>
      </section>

      <AnalyzerResults
        result={result}
        isUnlocked={isUnlocked}
        onUnlock={handleUnlock}
        hideShare
      />
    </>
  );
}
