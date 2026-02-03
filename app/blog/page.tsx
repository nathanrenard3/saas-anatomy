import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BlogPostsGrid } from "@/feature/blog/blog-posts-grid";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,hsl(var(--primary)/0.15),transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_80%,hsl(var(--primary)/0.1),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <BlurFade delay={0.1} inView>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-4xl mx-auto">
              Décortique les{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                SaaS rentables
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Explore comment les SaaS les plus rentables génèrent du revenu et applique ces stratégies à ton propre projet.
            </p>
          </BlurFade>
        </div>

        {/* Posts Grid with Client-side filtering */}
        <BlogPostsGrid initialPosts={posts} tags={tags} />
      </div>
    </div>
  );
}
