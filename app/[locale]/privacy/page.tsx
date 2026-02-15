import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/feature/Marketing/navbar";
import { Footer } from "@/feature/Marketing/footer";
import { MarkdownContent } from "@/components/markdown-content";
import type { Metadata } from "next";

const siteUrl = "https://saas-anatomy.com";

const privacyFiles: Record<string, string> = {
  fr: "fr/politique-confidentialite.md",
  en: "en/privacy-policy.md",
};

async function getPrivacyContent(locale: string) {
  const filename = privacyFiles[locale] || privacyFiles.fr;
  const filePath = path.join(process.cwd(), 'content', 'legal', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);
  return content;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("privacy");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteUrl}/${locale}/privacy`,
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
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: {
        fr: `${siteUrl}/fr/privacy`,
        en: `${siteUrl}/en/privacy`,
      },
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const content = await getPrivacyContent(locale);

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
