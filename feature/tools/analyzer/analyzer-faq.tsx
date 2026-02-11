import { BlurFade } from "@/components/magicui/blur-fade";

const FAQ_ITEMS = [
  {
    q: "Quels critères sont analysés ?",
    a: "L'outil évalue 10 critères : clarté en 5 secondes, audience cible, proposition de valeur, résultat mesurable, CTA, articulation du problème, preuve sociale, différenciation, gestion des objections et structure.",
  },
  {
    q: "L'outil est-il vraiment gratuit ?",
    a: "Oui, 100% gratuit. Tu peux analyser jusqu'à 3 pages par jour. Les 4 premiers critères sont accessibles directement, les 6 suivants après inscription à la newsletter.",
  },
  {
    q: "Comment l'analyse fonctionne-t-elle techniquement ?",
    a: "On extrait le contenu textuel de ta page (titres, CTAs, texte, structure) puis une IA analyse la qualité du copywriting selon 10 critères calibrés pour les SaaS.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "On stocke uniquement le contenu public de la page analysée et ton email si tu choisis de t'inscrire. Aucune donnée sensible n'est collectée.",
  },
];

export function AnalyzerFAQ() {
  return (
    <section className="px-4 pb-16">
      <div className="container mx-auto max-w-3xl">
        <BlurFade delay={0.1} inView>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((faq) => (
                <div key={faq.q} className="p-5 rounded-xl border border-border bg-card space-y-2">
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
