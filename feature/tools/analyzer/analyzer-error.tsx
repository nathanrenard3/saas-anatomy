"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";

interface AnalyzerErrorProps {
  message: string;
  onRetry: () => void;
}

export function AnalyzerError({ message, onRetry }: AnalyzerErrorProps) {
  return (
    <section className="px-4 py-12">
      <div className="container mx-auto max-w-lg">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-foreground font-medium">{message}</p>
          <CTAButton
            onClick={onRetry}
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Réessayer
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
