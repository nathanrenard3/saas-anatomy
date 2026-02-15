"use client";

import { useTranslations } from "next-intl";
import { CTAButtonLink } from "@/components/ui/cta-button";
import { ArrowRight, Search } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

interface HeroSectionProps {
  postsCount: number;
}

export function HeroSection({ postsCount }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative px-4 py-24 md:py-32 overflow-hidden">
      {/* Grid Background with 13 columns - Vertical gradient stripes (5 columns on mobile, 13 on desktop) */}
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

      {/* Overlay mask for smoother blending */}
      <div className="absolute inset-0 -z-19 bg-linear-to-b from-background/30 via-transparent to-background/50" aria-hidden="true" />

      {/* Radial Gradient Background - Primary Layer */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_45%_85%,hsl(var(--primary)/0.4),transparent_50%)]"
        aria-hidden="true"
      />

      {/* Radial Gradient Background - Secondary Blur Layer */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_45%_68%,hsl(var(--primary)/0.68),transparent_40%)] blur-[50px]"
        aria-hidden="true"
      />

      {/* Enhanced Corner Brackets - Top (more subtle) */}
      <div className="absolute left-0 right-0 top-0 -z-10 h-px">
        <div className="absolute left-8 top-0 h-10 w-10 border-l border-t border-border/30 rounded-tl-sm" />
        <div className="absolute right-8 top-0 h-10 w-10 border-r border-t border-border/30 rounded-tr-sm" />
        {/* Very subtle glow effect on corners */}
        <div className="absolute left-8 top-0 h-10 w-10 bg-primary/3 blur-lg rounded-tl-lg" />
        <div className="absolute right-8 top-0 h-10 w-10 bg-primary/3 blur-lg rounded-tr-lg" />
      </div>

      {/* Enhanced Corner Brackets - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-px">
        <div className="absolute bottom-0 left-8 h-12 w-12 border-b-2 border-l-2 border-primary/30 rounded-bl-sm" />
        <div className="absolute bottom-0 right-8 h-12 w-12 border-b-2 border-r-2 border-primary/30 rounded-br-sm" />
        {/* Glow effect on corners */}
        <div className="absolute bottom-0 left-8 h-12 w-12 bg-primary/5 blur-xl rounded-bl-lg" />
        <div className="absolute bottom-0 right-8 h-12 w-12 bg-primary/5 blur-xl rounded-br-lg" />
      </div>

      {/* Centered Content */}
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          <BlurFade delay={0.1} inView>
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm shadow-lg shadow-primary/5">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/5 via-transparent to-primary/5 blur-sm" />

              <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 ring-2 ring-primary/30 ring-offset-1 ring-offset-background/50">
                <Search className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="relative text-sm font-medium text-foreground">{t("badge")}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-4xl">
              {t.rich("title", {
                highlight: (chunks) => (
                  <span className="relative inline-block">
                    <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                      {chunks}
                    </span>
                    {/* Very subtle glow effect behind text */}
                    <span className="absolute inset-0 bg-linear-to-r from-primary/8 via-primary/12 to-primary/8 blur-2xl -z-10" aria-hidden="true" />
                  </span>
                ),
              })}
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
              {t("description")}
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <CTAButtonLink
              href="/blog"
              size="lg"
              className="text-base px-8"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t("cta")}
            </CTAButtonLink>
          </BlurFade>

          {/* Mini stats - Centered */}
          {/* TODO: Retirer invisible quand les stats seront disponibles */}
          <BlurFade delay={0.5} inView>
            <div className="flex flex-wrap justify-center gap-12 pt-8 mt-8 border-t border-border/40 relative invisible">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

              <div className="relative text-center group">
                <div className="text-3xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  {postsCount}+
                </div>
                <div className="text-sm text-muted-foreground mt-1">{t("statsSaasAnalyzed")}</div>
                <div className="absolute inset-0 -z-10 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative text-center group">
                <div className="text-3xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-muted-foreground mt-1">{t("statsTransparency")}</div>
                <div className="absolute inset-0 -z-10 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative text-center group">
                <div className="text-3xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  0€
                </div>
                <div className="text-sm text-muted-foreground mt-1">{t("statsFreeAccess")}</div>
                <div className="absolute inset-0 -z-10 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Mask gradient at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
