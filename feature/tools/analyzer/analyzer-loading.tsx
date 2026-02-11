"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Globe, FileText, Brain, BarChart3, FileCheck } from "lucide-react";

const STEPS = [
  { label: "Connexion à la page...", icon: Globe, duration: 3000 },
  { label: "Lecture du contenu...", icon: FileText, duration: 3000 },
  { label: "Analyse du copywriting...", icon: Brain, duration: 6000 },
  { label: "Évaluation des critères...", icon: BarChart3, duration: 6000 },
  { label: "Préparation du rapport...", icon: FileCheck, duration: 7000 },
];

export function AnalyzerLoading() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const advanceStep = (step: number) => {
      if (step < STEPS.length - 1) {
        timeout = setTimeout(() => {
          setCurrentStep(step + 1);
          advanceStep(step + 1);
        }, STEPS[step].duration);
      }
    };

    advanceStep(0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="px-4 py-12">
      <div className="container mx-auto max-w-2xl">
        <div className="space-y-6">
          {/* Progress steps */}
          <div className="space-y-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isDone = index < currentStep;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isDone || isActive ? 1 : 0.3,
                    x: 0,
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary/10 border border-primary/20"
                      : isDone
                        ? "bg-muted/50"
                        : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : isDone
                          ? "bg-green-500/20 text-green-600"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isActive ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isDone ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-foreground"
                        : isDone
                          ? "text-muted-foreground"
                          : "text-muted-foreground/50"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Skeleton cards */}
          <div className="space-y-3 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="h-24 rounded-xl bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
