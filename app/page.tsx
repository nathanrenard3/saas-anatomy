import { getAllPosts } from "@/lib/blog";
import { Navbar } from "@/feature/Marketing/navbar";
import { HeroSection } from "@/feature/Marketing/hero-section";
import { WhatYouLearnSection } from "@/feature/Marketing/what-you-learn-section";
import { LatestAnalysesSection } from "@/feature/Marketing/latest-analyses-section";
import { WhyThisBlogSection } from "@/feature/Marketing/why-this-blog-section";
import { NewsletterCTASection } from "@/feature/Marketing/newsletter-cta-section";
import { Footer } from "@/feature/Marketing/footer";

export default async function Home() {
  const posts = await getAllPosts();
  const latestPostsForFooter = posts.map(post => ({
    slug: post.slug,
    title: post.title
  }));

  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <HeroSection postsCount={posts.length} />
        <WhatYouLearnSection />
        <LatestAnalysesSection posts={posts} maxPosts={3} />
        <WhyThisBlogSection />
        <NewsletterCTASection />
      </main>
      <Footer latestPosts={latestPostsForFooter} />
    </>
  );
}
