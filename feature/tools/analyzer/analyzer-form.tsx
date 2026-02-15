"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/ui/cta-button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

interface AnalyzerFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function AnalyzerForm({ onSubmit, isLoading }: AnalyzerFormProps) {
  const t = useTranslations("analyzer");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    onSubmit(normalizedUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto w-full">
      <div className="flex gap-3">
        <Input
          type="url"
          placeholder={t("urlPlaceholder")}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={isLoading}
          className="flex-1 h-12 bg-background border-border focus:border-primary transition-colors text-base"
        />
        <CTAButton
          type="submit"
          size="default"
          disabled={isLoading || !url.trim()}
          className="h-12 px-6"
          rightIcon={
            isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )
          }
        >
          {isLoading ? t("analyzing") : t("analyzeButton")}
        </CTAButton>
      </div>
      <p className="text-xs text-center text-muted-foreground mt-3">
        {t("formNote")}
      </p>
    </form>
  );
}
