"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Lightbulb, Target, TrendingUp } from "lucide-react";

export function WhyThisBlogSection() {
  const reasons = [
    {
      icon: Lightbulb,
      title: "Apprendre des meilleurs",
      description: "Décrypter les stratégies de SaaS rentables plutôt que suivre des théories"
    },
    {
      icon: Target,
      title: "Stratégies concrètes",
      description: "Des analyses détaillées des modèles économiques qui fonctionnent vraiment"
    },
    {
      icon: TrendingUp,
      title: "Gagner du temps",
      description: "Éviter les erreurs courantes en s'inspirant de projets déjà validés"
    }
  ];

  return (
    <section className="relative px-4 py-24 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Pourquoi SaaS Anatomy peut{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                vraiment t'aider
              </span>
            </h2>
          </div>
        </BlurFade>

        {/* Main Content */}
        <BlurFade delay={0.2} inView>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              Créer un SaaS rentable demande bien plus qu'une bonne idée. Il faut comprendre comment
              attirer des utilisateurs, monétiser efficacement et choisir les bons outils pour scaler
              sans se ruiner.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              SaaS Anatomy analyse des <span className="font-semibold text-foreground">SaaS qui génèrent
              réellement du revenu</span> pour décortiquer leurs stratégies de croissance, leurs modèles
              de pricing, leur stack technique et leurs canaux d'acquisition. L'objectif ? Aider les
              développeurs, indie hackers et créateurs de produits digitaux à{" "}
              <span className="font-semibold text-foreground">lancer plus vite et plus intelligemment</span>.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Plutôt que de partir de zéro, découvre comment des entrepreneurs et équipes ont construit
              des business rentables, les erreurs qu'ils ont évitées, et les tactiques qui ont vraiment
              fait la différence. Des analyses concrètes, sans bullshit, pour passer de l'idée au revenu.
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
