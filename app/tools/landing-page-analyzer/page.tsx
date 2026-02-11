import { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AnalyzerHero } from "@/feature/tools/analyzer/analyzer-hero";
import { AnalyzerHowItWorks } from "@/feature/tools/analyzer/analyzer-how-it-works";
import { AnalyzerFAQ } from "@/feature/tools/analyzer/analyzer-faq";

const siteUrl = "https://saas-anatomy.com";

export const metadata: Metadata = {
  title: "Audit Copywriting Gratuit | SaaS Anatomy",
  description:
    "Audite le copywriting de ta landing page gratuitement. Score détaillé sur 10 critères : clarté, proposition de valeur, CTA, preuve sociale et plus.",
  keywords: [
    "audit copywriting",
    "analyse copywriting landing page",
    "copywriting SaaS",
    "optimiser landing page",
    "audit page de vente",
    "taux de conversion",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/tools/landing-page-analyzer`,
    siteName: "SaaS Anatomy",
    title: "Audit Copywriting Gratuit | SaaS Anatomy",
    description:
      "Audite le copywriting de ta page en 30 secondes. 10 critères analysés par IA avec recommandations concrètes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SaaS Anatomy - Audit Copywriting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Copywriting Gratuit | SaaS Anatomy",
    description:
      "Audite le copywriting de ta page en 30 secondes. 10 critères analysés par IA.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/tools/landing-page-analyzer`,
  },
};

export default function AnalyzerPage() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Audit Copywriting SaaS",
    url: `${siteUrl}/tools/landing-page-analyzer`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description:
      "Outil gratuit d'audit copywriting pour fondateurs SaaS. Score sur 10 critères avec recommandations actionables.",
    inLanguage: "fr-FR",
    author: {
      "@type": "Organization",
      name: "SaaS Anatomy",
      url: siteUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quels critères sont analysés ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'outil évalue 10 critères : clarté en 5 secondes, audience cible, proposition de valeur, résultat mesurable, CTA, articulation du problème, preuve sociale, différenciation, gestion des objections et structure.",
        },
      },
      {
        "@type": "Question",
        name: "L'outil est-il vraiment gratuit ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, 100% gratuit. Tu peux analyser jusqu'à 3 pages par jour. Les 4 premiers critères sont accessibles directement, les 6 suivants après inscription à la newsletter.",
        },
      },
      {
        "@type": "Question",
        name: "Comment l'analyse fonctionne-t-elle techniquement ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On extrait le contenu textuel de ta page (titres, CTAs, texte, structure) puis une IA analyse la qualité du copywriting selon 10 critères calibrés pour les SaaS.",
        },
      },
      {
        "@type": "Question",
        name: "Mes données sont-elles protégées ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On stocke uniquement le contenu public de la page analysée et ton email si tu choisis de t'inscrire. Aucune donnée sensible n'est collectée.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen relative">
      <JsonLd data={toolSchema} />
      <JsonLd data={faqSchema} />
      <AnalyzerHero />
      <AnalyzerHowItWorks />
      <AnalyzerFAQ />
    </div>
  );
}
