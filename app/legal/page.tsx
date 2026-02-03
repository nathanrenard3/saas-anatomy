import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Navbar } from "@/feature/Marketing/navbar";
import { Footer } from "@/feature/Marketing/footer";
import { MarkdownContent } from "@/components/markdown-content";
import type { Metadata } from "next";

async function getLegalContent() {
  const filePath = path.join(process.cwd(), 'content', 'legal', 'mentions-legales.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);

  return content;
}

export default async function LegalPage() {
  const content = await getLegalContent();

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
  title: 'Mentions Légales | SaaS Anatomy',
  description: 'Mentions légales et informations sur l\'éditeur du site SaaS Anatomy',
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${siteUrl}/legal`,
    siteName: "SaaS Anatomy",
    title: 'Mentions Légales | SaaS Anatomy',
    description: 'Mentions légales et informations sur l\'éditeur du site SaaS Anatomy',
  },
  twitter: {
    card: "summary",
    title: 'Mentions Légales | SaaS Anatomy',
    description: 'Mentions légales et informations sur l\'éditeur du site SaaS Anatomy',
  },
  alternates: {
    canonical: `${siteUrl}/legal`,
  },
  robots: {
    index: false, // Legal pages are typically not indexed
    follow: true,
  },
};
