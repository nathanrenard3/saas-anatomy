import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import { getAnalysisById } from "@/lib/analyzer/storage";
import { findLeadByEmail } from "@/lib/analyzer/lead";
import { JsonLd } from "@/components/json-ld";
import { ReportView } from "@/feature/tools/analyzer/report-view";
import type { AnalysisResult } from "@/lib/analyzer/types";

const siteUrl = "https://saas-anatomy.com";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function scoreToGrade(score: number): string {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  if (score >= 20) return "D";
  return "F";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations("analyzer");

  if (!UUID_REGEX.test(id)) {
    return { title: t("reportNotFound") };
  }

  const analysis = await getAnalysisById(id);

  if (!analysis) {
    return { title: t("reportNotFound") };
  }

  const grade = scoreToGrade(analysis.overallScore);
  const title = t("reportMetaTitle", {
    domain: analysis.domain,
    score: analysis.overallScore,
    grade,
  });
  const description = t("reportMetaDescription", {
    domain: analysis.domain,
    score: analysis.overallScore,
  });

  return {
    title,
    description,
    openGraph: {
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteUrl}/${locale}/tools/landing-page-analyzer/report/${id}`,
      siteName: "SaaS Anatomy",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/tools/landing-page-analyzer/report/${id}/og`,
          width: 1200,
          height: 630,
          alt: t("reportOgAlt", { domain: analysis.domain }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("reportTwitterTitle", {
        domain: analysis.domain,
        score: analysis.overallScore,
        grade,
      }),
      description,
      images: [`${siteUrl}/tools/landing-page-analyzer/report/${id}/og`],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tools/landing-page-analyzer/report/${id}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations("analyzer");

  if (!UUID_REGEX.test(id)) {
    notFound();
  }

  const analysis = await getAnalysisById(id);

  if (!analysis) {
    notFound();
  }

  const cookieStore = await cookies();
  const leadEmail = cookieStore.get("lead_email")?.value;
  let isUnlocked = false;

  if (leadEmail) {
    const lead = await findLeadByEmail(leadEmail);
    if (lead) {
      isUnlocked = true;
    }
  }

  const rawResult = analysis.analysisResult as {
    score_global: number;
    grade_global: "A" | "B" | "C" | "D" | "F";
    resume: string;
    criteres: AnalysisResult["criteres"];
    points_forts: string[];
    points_faibles: string[];
  };

  const result: AnalysisResult = {
    ...rawResult,
    id: analysis.id,
    url: analysis.url,
    domain: analysis.domain,
    created_at: analysis.createdAt!.toISOString(),
    isUnlocked,
    remaining_analyses: -1,
  };

  const reportSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("reportSchemaName", { domain: analysis.domain }),
    url: `${siteUrl}/${locale}/tools/landing-page-analyzer/report/${id}`,
    description: t("reportSchemaScore", { score: analysis.overallScore }),
    isPartOf: {
      "@type": "WebApplication",
      name: t("toolSchemaName"),
      url: `${siteUrl}/${locale}/tools/landing-page-analyzer`,
    },
  };

  return (
    <div className="min-h-screen relative">
      <JsonLd data={reportSchema} />
      <ReportView result={result} isUnlocked={isUnlocked} />
    </div>
  );
}
