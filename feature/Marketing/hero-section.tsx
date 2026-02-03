"use client";

import { CTAButtonLink } from "@/components/ui/cta-button";
import { ArrowRight, Search } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";

interface HeroSectionProps {
  postsCount: number;
}

export function HeroSection({ postsCount }: HeroSectionProps) {
  return (
    <section className="relative px-4 py-24 md:py-32 overflow-hidden">
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

      {/* Corner Brackets - Top */}
      <div className="absolute left-0 right-0 top-0 -z-10 h-px">
        <div className="absolute left-8 top-0 h-8 w-8 border-l border-t border-border/40" />
        <div className="absolute right-8 top-0 h-8 w-8 border-r border-t border-border/40" />
      </div>

      {/* Corner Brackets - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-px">
        <div className="absolute bottom-0 left-8 h-8 w-8 border-b border-l border-border/40" />
        <div className="absolute bottom-0 right-8 h-8 w-8 border-b border-r border-border/40" />
      </div>

      {/* Centered Content */}
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 backdrop-blur-sm shadow-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                <Search className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Le guide pour que ton premier SaaS rapporte vraiment</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-4xl">
              Analyse les SaaS qui{" "}
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                rapportent vraiment de l&apos;argent
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
              Découvre les secrets des SaaS qui cartonnent pour comprendre comment ils génèrent du revenu et
              comment toi aussi tu peux le faire.
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <CTAButtonLink
              href="/blog"
              size="lg"
              className="text-base px-8"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Entrer dans les coulisses
            </CTAButtonLink>
          </BlurFade>

          {/* Mini stats - Centered */}
          <BlurFade delay={0.5} inView>
            <div className="flex flex-wrap justify-center gap-8 pt-8 mt-8 border-t border-border/40">
              <div className="text-center">
                <div className="text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {postsCount}+
                </div>
                <div className="text-sm text-muted-foreground mt-1">SaaS analysés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-muted-foreground mt-1">Transparence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  0€
                </div>
                <div className="text-sm text-muted-foreground mt-1">Accès gratuit</div>
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
