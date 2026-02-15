"use client";

import { useTranslations } from 'next-intl';
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CTAButtonLink } from "@/components/ui/cta-button";

export function NewsletterSidebarCTA() {
  const t = useTranslations('blog');
  return (
    <BlurFade delay={0.4} inView>
      <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-background p-6">
        <h3 className="text-lg font-bold mb-3">
          {t('dontMiss')}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t('dontMissDescription')}
        </p>
        <CTAButtonLink
          href="/#newsletter"
          size="sm"
          className="w-full"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {t('subscribeShort')}
        </CTAButtonLink>
      </div>
    </BlurFade>
  );
}
