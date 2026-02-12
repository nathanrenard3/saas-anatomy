import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
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

  if (!UUID_REGEX.test(id)) {
    return { title: "Rapport introuvable" };
  }

  const analysis = await getAnalysisById(id);

  if (!analysis) {
    return { title: "Rapport introuvable" };
  }

  const grade = scoreToGrade(analysis.overallScore);
  const title = `${analysis.domain} - Score ${analysis.overallScore}/100 (${grade}) | Audit Copywriting`;
  const description = `Résultat de l'audit copywriting de ${analysis.domain}. Score global : ${analysis.overallScore}/100. Découvre l'analyse détaillée sur 10 critères.`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: `${siteUrl}/tools/landing-page-analyzer/report/${id}`,
      siteName: "SaaS Anatomy",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/tools/landing-page-analyzer/report/${id}/og`,
          width: 1200,
          height: 630,
          alt: `Audit copywriting de ${analysis.domain}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${analysis.domain} : ${analysis.overallScore}/100 (${grade})`,
      description,
      images: [`${siteUrl}/tools/landing-page-analyzer/report/${id}/og`],
    },
    alternates: {
      canonical: `${siteUrl}/tools/landing-page-analyzer/report/${id}`,
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
    name: `Audit copywriting de ${analysis.domain}`,
    url: `${siteUrl}/tools/landing-page-analyzer/report/${id}`,
    description: `Score global : ${analysis.overallScore}/100`,
    isPartOf: {
      "@type": "WebApplication",
      name: "Audit Copywriting SaaS",
      url: `${siteUrl}/tools/landing-page-analyzer`,
    },
  };

  return (
    <div className="min-h-screen relative">
      <JsonLd data={reportSchema} />
      <ReportView result={result} isUnlocked={isUnlocked} />
    </div>
  );
}
