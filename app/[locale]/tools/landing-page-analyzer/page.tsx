import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import { AnalyzerHero } from "@/feature/tools/analyzer/analyzer-hero";
import { AnalyzerHowItWorks } from "@/feature/tools/analyzer/analyzer-how-it-works";
import { AnalyzerFAQ } from "@/feature/tools/analyzer/analyzer-faq";

const siteUrl = "https://saas-anatomy.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("analyzer");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t("metaKeywords").split(", "),
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteUrl}/${locale}/tools/landing-page-analyzer`,
      siteName: "SaaS Anatomy",
      title: t("metaTitle"),
      description: t("metaOgDescription"),
      images: [
        {
          url: `/${locale}/tools/landing-page-analyzer/og`,
          width: 1200,
          height: 630,
          alt: t("metaTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaOgDescription"),
      images: [`/${locale}/tools/landing-page-analyzer/og`],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tools/landing-page-analyzer`,
      languages: {
        fr: `${siteUrl}/fr/tools/landing-page-analyzer`,
        en: `${siteUrl}/en/tools/landing-page-analyzer`,
      },
    },
  };
}

export default async function AnalyzerPage() {
  const locale = await getLocale();
  const t = await getTranslations("analyzer");

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("toolSchemaName"),
    url: `${siteUrl}/${locale}/tools/landing-page-analyzer`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: t("toolSchemaDescription"),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
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
        name: t("faq1Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq1A"),
        },
      },
      {
        "@type": "Question",
        name: t("faq2Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq2A"),
        },
      },
      {
        "@type": "Question",
        name: t("faq3Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq3A"),
        },
      },
      {
        "@type": "Question",
        name: t("faq4Q"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("faq4A"),
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
