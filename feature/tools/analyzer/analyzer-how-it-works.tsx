import { BlurFade } from "@/components/magicui/blur-fade";

const STEPS = [
  {
    step: "1",
    title: "Colle ton URL",
    description: "Entre l'adresse de ta landing page dans le formulaire ci-dessus.",
  },
  {
    step: "2",
    title: "Analyse IA",
    description: "L'IA analyse le contenu, les titres, les CTAs et la structure de ta page.",
  },
  {
    step: "3",
    title: "Rapport détaillé",
    description: "Reçois un score sur 100 et des recommandations concrètes pour chaque critère.",
  },
];

export function AnalyzerHowItWorks() {
  return (
    <section className="px-4 py-16 bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-3xl space-y-12">
        <BlurFade delay={0.1} inView>
          <div className="space-y-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Comment fonctionne l&apos;analyseur ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              L&apos;outil analyse le contenu textuel de ta page pour évaluer la qualité
              de ton copywriting selon 10 critères essentiels.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((item, i) => (
            <BlurFade key={item.step} delay={0.2 + i * 0.1} inView>
              <div className="text-center space-y-3 p-6 rounded-xl border border-border bg-card">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
