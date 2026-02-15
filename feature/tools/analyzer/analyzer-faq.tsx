"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/magicui/blur-fade";

const FAQ_KEYS = [
  { q: "faq1Q", a: "faq1A" },
  { q: "faq2Q", a: "faq2A" },
  { q: "faq3Q", a: "faq3A" },
  { q: "faq4Q", a: "faq4A" },
] as const;

export function AnalyzerFAQ() {
  const t = useTranslations("analyzer");

  return (
    <section className="px-4 pb-16">
      <div className="container mx-auto max-w-3xl">
        <BlurFade delay={0.1} inView>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-center">
              {t("faqTitle")}
            </h2>
            <div className="space-y-4">
              {FAQ_KEYS.map((faq) => (
                <div key={faq.q} className="p-5 rounded-xl border border-border bg-card space-y-2">
                  <h3 className="font-semibold text-foreground">{t(faq.q)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(faq.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
