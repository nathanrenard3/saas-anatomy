"use client";

import { useState, useCallback } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Search } from "lucide-react";
import { AnalyzerForm } from "./analyzer-form";
import { AnalyzerLoading } from "./analyzer-loading";
import { AnalyzerResults } from "./analyzer-results";
import { AnalyzerError } from "./analyzer-error";
import type { AnalysisResult, AnalysisState } from "@/lib/analyzer/types";


export function AnalyzerHero() {
  const [state, setState] = useState<AnalysisState>({ status: "idle" });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleAnalyze = useCallback(async (url: string) => {
    setState({ status: "analyzing", step: 0 });

    try {
      const res = await fetch("/api/tools/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      const result: AnalysisResult = data;
      setIsUnlocked(result.isUnlocked);
      setState({ status: "complete", result });
    } catch (error: unknown) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'analyse.",
      });
    }
  }, []);

  const handleRetry = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  const isLoading = state.status === "analyzing";

  return (
    <>
      {/* Hero section */}
      <section className="relative px-4 py-24 md:py-32 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 -z-20 grid grid-cols-5 md:grid-cols-13 h-full w-full" aria-hidden="true">
          <div className="h-full opacity-12 bg-linear-to-b from-primary/30 via-primary/10 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-8 bg-linear-to-t from-primary/20 via-primary/5 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-15 bg-linear-to-b from-primary/40 via-primary/15 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-10 bg-linear-to-t from-primary/25 via-primary/8 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-13 bg-linear-to-b from-primary/35 via-primary/12 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-9 bg-linear-to-t from-primary/30 via-primary/10 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-16 bg-linear-to-b from-primary/45 via-primary/18 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-11 bg-linear-to-t from-primary/35 via-primary/12 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-14 bg-linear-to-b from-primary/38 via-primary/14 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-9 bg-linear-to-t from-primary/28 via-primary/9 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-12 bg-linear-to-b from-primary/32 via-primary/11 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-10 bg-linear-to-t from-primary/22 via-primary/7 to-transparent mix-blend-overlay" />
          <div className="h-full opacity-8 bg-linear-to-b from-primary/25 via-primary/8 to-transparent mix-blend-overlay" />
        </div>

        {/* Overlay mask */}
        <div className="absolute inset-0 -z-19 bg-linear-to-b from-background/30 via-transparent to-background/50" aria-hidden="true" />

        {/* Radial gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_45%_85%,hsl(var(--primary)/0.4),transparent_50%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_45%_68%,hsl(var(--primary)/0.68),transparent_40%)] blur-[50px]" aria-hidden="true" />

        {/* Corner brackets */}
        <div className="absolute left-0 right-0 top-0 -z-10 h-px">
          <div className="absolute left-8 top-0 h-10 w-10 border-l border-t border-border/30 rounded-tl-sm" />
          <div className="absolute right-8 top-0 h-10 w-10 border-r border-t border-border/30 rounded-tr-sm" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 -z-10 h-px">
          <div className="absolute bottom-0 left-8 h-12 w-12 border-b-2 border-l-2 border-primary/30 rounded-bl-sm" />
          <div className="absolute bottom-0 right-8 h-12 w-12 border-b-2 border-r-2 border-primary/30 rounded-br-sm" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            <BlurFade delay={0.1} inView>
              <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm shadow-lg shadow-primary/5">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/5 via-transparent to-primary/5 blur-sm" />
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 ring-2 ring-primary/30 ring-offset-1 ring-offset-background/50">
                  <Search className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="relative text-sm font-medium text-foreground">
                  Audit gratuit - 10 critères analysés
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-4xl">
                Audite le{" "}
                <span className="relative inline-block">
                  <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    copywriting
                  </span>
                  <span className="absolute inset-0 bg-linear-to-r from-primary/8 via-primary/12 to-primary/8 blur-2xl -z-10" aria-hidden="true" />
                </span>{" "}
                de ta page en 30 secondes
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
                Découvre si ton copywriting convertit vraiment ta cible.
                10 critères analysés par IA pour un rapport actionable.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <AnalyzerForm onSubmit={handleAnalyze} isLoading={isLoading} />
            </BlurFade>
          </div>
        </div>

        {/* Bottom mask */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none" aria-hidden="true" />
      </section>

      {/* Results / Loading / Error states */}
      {state.status === "analyzing" && <AnalyzerLoading />}

      {state.status === "complete" && (
        <AnalyzerResults
          result={state.result}
          isUnlocked={isUnlocked}
          onUnlock={handleUnlock}
        />
      )}

      {state.status === "error" && (
        <AnalyzerError message={state.message} onRetry={handleRetry} />
      )}
    </>
  );
}
