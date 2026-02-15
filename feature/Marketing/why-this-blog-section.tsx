"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Lightbulb, Target, TrendingUp } from "lucide-react";

export function WhyThisBlogSection() {
  const t = useTranslations("whyThisBlog");

  const reasons = [
    {
      icon: Lightbulb,
      title: t("reason1Title"),
      description: t("reason1Description")
    },
    {
      icon: Target,
      title: t("reason2Title"),
      description: t("reason2Description")
    },
    {
      icon: TrendingUp,
      title: t("reason3Title"),
      description: t("reason3Description")
    }
  ];

  return (
    <section className="relative px-4 py-24 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              {t.rich("title", {
                highlight: (chunks) => (
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
          </div>
        </BlurFade>

        {/* Main Content */}
        <BlurFade delay={0.2} inView>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              {t("paragraph1")}
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {t.rich("paragraph2", {
                bold: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
              })}
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {t("paragraph3")}
            </p>
          </div>
        </BlurFade>

        {/* Key Benefits */}
        <BlurFade delay={0.3} inView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
