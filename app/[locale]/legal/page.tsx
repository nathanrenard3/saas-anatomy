import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/feature/Marketing/navbar";
import { Footer } from "@/feature/Marketing/footer";
import { MarkdownContent } from "@/components/markdown-content";
import type { Metadata } from "next";

const siteUrl = "https://saas-anatomy.com";

const legalFiles: Record<string, string> = {
  fr: "fr/mentions-legales.md",
  en: "en/legal-notice.md",
};

async function getLegalContent(locale: string) {
  const filename = legalFiles[locale] || legalFiles.fr;
  const filePath = path.join(process.cwd(), 'content', 'legal', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);
  return content;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("legal");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteUrl}/${locale}/legal`,
      siteName: "SaaS Anatomy",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    twitter: {
      card: "summary",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/legal`,
      languages: {
        fr: `${siteUrl}/fr/legal`,
        en: `${siteUrl}/en/legal`,
      },
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegalPage() {
  const locale = await getLocale();
  const content = await getLegalContent(locale);

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <article className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <MarkdownContent content={content} />
        </article>
      </main>
      <Footer latestPosts={[]} />
    </>
  );
}
