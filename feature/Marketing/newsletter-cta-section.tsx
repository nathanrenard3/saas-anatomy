"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CTAButton } from "@/components/ui/cta-button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";

export function NewsletterCTASection() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Sparkles,
      text: "Les dernières analyses de SaaS rentables"
    },
    {
      icon: TrendingUp,
      text: "Des stratégies de croissance validées"
    },
    {
      icon: Zap,
      text: "Des tactiques concrètes à appliquer"
    }
  ];

  return (
    <section id="newsletter" className="relative px-4 py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <BlurFade delay={0.1} inView>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Newsletter gratuite</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Reçois les{" "}
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    meilleures analyses
                  </span>{" "}
                  directement
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Chaque mois, découvre comment des SaaS génèrent du revenu et les tactiques que tu peux appliquer à ton projet.
                </p>
              </div>

              {/* Benefits - Hidden, kept for potential future use */}
              <div className="hidden">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index}>
                      <Icon className="w-5 h-5" />
                      <p>{benefit.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* Form */}
              <BlurFade delay={0.4} inView>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div className="flex gap-3">
                    {/* Honeypot field — invisible to humans, bots fill it */}
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute opacity-0 pointer-events-none"
                    />
                    <Input
                      type="email"
                      placeholder="ton@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="flex-1 h-11 bg-background border-border focus:border-primary transition-colors"
                    />
                    <CTAButton
                      type="submit"
                      size="default"
                      disabled={isLoading}
                      className="h-11 px-6"
                      rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
                    >
                      {isLoading ? "..." : "S'inscrire"}
                    </CTAButton>
                  </div>

                  {status === "success" && (
                    <p className="text-sm text-center text-green-600 dark:text-green-400">
                      ✓ Inscription réussie !
                    </p>
                  )}

                  {status === "error" && (
                    <p className="text-sm text-center text-red-600 dark:text-red-400">
                      ✗ Une erreur s'est produite. Réessaye plus tard.
                    </p>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    Pas de spam. Désinscription en un clic. Newsletters mensuelles uniquement.
                  </p>
                </form>
              </BlurFade>

              {/* Social Proof */}
              <BlurFade delay={0.5} inView>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Rejoins les <span className="font-semibold text-foreground">entrepreneurs</span> qui construisent des SaaS rentables
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
