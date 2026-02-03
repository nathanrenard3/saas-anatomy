"use client";

import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CTAButtonLink } from "@/components/ui/cta-button";

export function NewsletterSidebarCTA() {
  return (
    <BlurFade delay={0.4} inView>
      <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-background p-6">
        <h3 className="text-lg font-bold mb-3">
          Ne rate rien
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Reçois les nouvelles analyses directement par email.
        </p>
        <CTAButtonLink
          href="/#newsletter"
          size="sm"
          className="w-full"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          M&apos;inscrire
        </CTAButtonLink>
      </div>
    </BlurFade>
  );
}
