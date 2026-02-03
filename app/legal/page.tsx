import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Navbar } from "@/feature/Marketing/navbar";
import { Footer } from "@/feature/Marketing/footer";
import { MarkdownContent } from "@/components/markdown-content";

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

export const metadata = {
  title: 'Mentions Légales | SaaS Anatomy',
  description: 'Mentions légales du site SaaS Anatomy',
};
