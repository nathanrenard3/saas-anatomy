import { getLocale } from "next-intl/server";
import { Navbar } from "@/feature/Marketing/navbar";
import { Footer } from "@/feature/Marketing/footer";
import { getAllPosts } from "@/lib/blog";

export default async function AnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const posts = await getAllPosts(locale);
  const latestPostsForFooter = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
  }));

  return (
    <>
      <Navbar />
      {children}
      <Footer latestPosts={latestPostsForFooter} />
    </>
  );
}
