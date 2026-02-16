import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllPosts, getPostBySlug, getAlternatePost } from "@/lib/blog";
import { ArrowLeft, Calendar, ChevronRight, Clock, Home, RefreshCw } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { PortableTextContent } from "@/components/portable-text-content";
import { RelatedPostsSidebar } from "@/components/related-posts-sidebar";
import { NewsletterSidebarCTA } from "@/components/newsletter-sidebar-cta";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

// ISR Revalidation: revalidate every 24 hours to fetch article updates
export const revalidate = 86400; // 24 hours in seconds

export async function generateStaticParams() {
  const [frPosts, enPosts] = await Promise.all([
    getAllPosts("fr"),
    getAllPosts("en"),
  ]);
  return [
    ...frPosts.map((post) => ({ slug: post.slug })),
    ...enPosts.map((post) => ({ slug: post.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: t("articleNotFound"),
    };
  }

  const siteUrl = "https://saas-anatomy.com";
  const ogImageUrl = `/${locale}/blog/${slug}/og`;
  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/images/default-thumb.webp`;

  const alternateLanguages: Record<string, string> = {
    [locale]: `${siteUrl}/${locale}/blog/${slug}`,
  };

  if (post.translationGroup) {
    const otherLocale = locale === "fr" ? "en" : "fr";
    const alternatePost = await getAlternatePost(post.translationGroup, otherLocale);
    if (alternatePost) {
      alternateLanguages[otherLocale] = `${siteUrl}/${otherLocale}/blog/${alternatePost.slug}`;
    }
  }

  return {
    title: `${post.title} | SaaS Anatomy`,
    description: post.excerpt,
    authors: [{ name: "SaaS Anatomy" }],
    keywords: post.tags?.join(", "),
    openGraph: {
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${siteUrl}/${locale}/blog/${slug}`,
      siteName: "SaaS Anatomy",
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["SaaS Anatomy"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: alternateLanguages,
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  // Get all posts for related posts sidebar
  const allPosts = await getAllPosts(locale);

  // Generate structured data schemas
  const articleSchema = generateArticleSchema(post, locale);
  const breadcrumbSchema = generateBreadcrumbSchema(post, locale);

  const dateLocale = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <div className="min-h-screen relative">
      {/* JSON-LD Structured Data */}
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Background Effects */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,hsl(var(--primary)/0.1),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-8 md:py-12 mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <BlurFade delay={0.1} inView>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home className="h-3.5 w-3.5" />
                {t("home")}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
            </nav>
          </BlurFade>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Content */}
            <article className="min-w-0">
              {/* Article Header */}
              <BlurFade delay={0.2} inView>
                <header className="mb-12 space-y-6">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full px-3">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(dateLocale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    <span className="text-border">•</span>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{t("readingTime", { minutes: post.readingTime })}</span>
                    </div>

                    <span className="text-border">•</span>

                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>{t("updatedOn", { date: new Date(post.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short', year: 'numeric' }) })}</span>
                    </div>
                  </div>

                  <Separator />
                </header>
              </BlurFade>

              {/* Article Content */}
              <BlurFade delay={0.3} inView>
                <PortableTextContent content={post.content} />
              </BlurFade>

              {/* Article Footer */}
              <BlurFade delay={0.4} inView>
                <footer className="mt-16 pt-8 border-t border-border">
                  <div className="flex items-center justify-between gap-4">
                    <Button asChild variant="outline" className="gap-2">
                      <Link href="/blog">
                        <ArrowLeft className="h-4 w-4" />
                        {t("allArticles")}
                      </Link>
                    </Button>
                  </div>
                </footer>
              </BlurFade>
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-6">
              <RelatedPostsSidebar posts={allPosts} currentSlug={slug} />
              <NewsletterSidebarCTA />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
