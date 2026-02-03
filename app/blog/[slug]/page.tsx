import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, Clock, Home, RefreshCw } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MarkdownContent } from "@/components/markdown-content";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article introuvable',
    };
  }

  return {
    title: `${post.title} | SaaS Anatomy`,
    description: post.excerpt,
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 5);

  return (
    <div className="min-h-screen relative">
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
                Accueil
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
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    <span className="text-border">•</span>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readingTime}</span>
                    </div>

                    <span className="text-border">•</span>

                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Mis à jour le {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <Separator />
                </header>
              </BlurFade>

              {/* Article Content */}
              <BlurFade delay={0.3} inView>
                <MarkdownContent content={post.content} />
              </BlurFade>

              {/* Article Footer */}
              <BlurFade delay={0.4} inView>
                <footer className="mt-16 pt-8 border-t border-border">
                  <div className="flex items-center justify-between gap-4">
                    <Button asChild variant="outline" className="gap-2">
                      <Link href="/blog">
                        <ArrowLeft className="h-4 w-4" />
                        Tous les articles
                      </Link>
                    </Button>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-end">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </footer>
              </BlurFade>
            </article>

            {/* Sidebar - Related Posts */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-6">
              <BlurFade delay={0.3} inView>
                <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    Autres analyses
                  </h3>

                  {relatedPosts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun autre article pour le moment.</p>
                  ) : (
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.slug}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <article className="rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                            <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                              {relatedPost.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{relatedPost.readingTime}</span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </BlurFade>

              {/* Newsletter CTA */}
              <BlurFade delay={0.4} inView>
                <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-background p-6">
                  <h3 className="text-lg font-bold mb-3">
                    Ne rate rien
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reçois les nouvelles analyses directement par email.
                  </p>
                  <Button asChild size="sm" className="w-full rounded-full">
                    <Link href="/#newsletter">
                      M&apos;inscrire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </BlurFade>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
