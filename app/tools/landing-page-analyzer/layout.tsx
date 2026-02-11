import { Navbar } from "@/feature/Marketing/navbar";
import { Footer } from "@/feature/Marketing/footer";
import { getAllPosts } from "@/lib/blog";

export default async function AnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getAllPosts();
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
