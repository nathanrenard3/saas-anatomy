import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Navbar } from "@/feature/Marketing/navbar";
import { Footer } from "@/feature/Marketing/footer";
import { MarkdownContent } from "@/components/markdown-content";
import type { Metadata } from "next";

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), 'content', 'legal', 'politique-confidentialite.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);

  return content;
}

export default async function PrivacyPage() {
  const content = await getPrivacyContent();

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

const siteUrl = "https://saas-anatomy.com";

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | SaaS Anatomy',
  description: 'Politique de confidentialité et protection des données personnelles du site SaaS Anatomy. Découvrez comment nous traitons vos données.',
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/privacy`,
    siteName: "SaaS Anatomy",
    title: 'Politique de Confidentialité | SaaS Anatomy',
    description: 'Politique de confidentialité et protection des données personnelles du site SaaS Anatomy. Découvrez comment nous traitons vos données.',
  },
  twitter: {
    card: "summary",
    title: 'Politique de Confidentialité | SaaS Anatomy',
    description: 'Politique de confidentialité et protection des données personnelles du site SaaS Anatomy.',
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: {
    index: false, // Privacy pages are typically not indexed
    follow: true,
  },
};
