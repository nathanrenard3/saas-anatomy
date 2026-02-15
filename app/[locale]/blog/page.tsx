import { getLocale, getTranslations } from "next-intl/server";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BlogPostsGrid } from "@/feature/blog/blog-posts-grid";
import type { Metadata } from "next";

const siteUrl = "https://saas-anatomy.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("blog");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: ["SaaS", "blog", "tutoriel", "guide", "stratégie", "monétisation", "startup"],
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteUrl}/${locale}/blog`,
      siteName: "SaaS Anatomy",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: "Blog SaaS Anatomy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/og-default.png"],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        fr: `${siteUrl}/fr/blog`,
        en: `${siteUrl}/en/blog`,
      },
    },
  };
}

// ISR Revalidation: revalidate every 24 hours to fetch new articles
export const revalidate = 86400; // 24 hours in seconds

export default async function BlogPage() {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const posts = await getAllPosts(locale);
  const tags = await getAllTags(locale);

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
              {t.rich("heroTitle", {
                highlight: (chunks) => (
                  <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              {t("heroDescription")}
            </p>
          </BlurFade>
        </div>

        {/* Posts Grid with Client-side filtering */}
        <BlogPostsGrid initialPosts={posts} tags={tags} />
      </div>
    </div>
  );
}
