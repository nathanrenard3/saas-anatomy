"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, FileText } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import type { BlogPost } from "@/lib/blog";

interface LatestAnalysesSectionProps {
  posts: BlogPost[];
  maxPosts?: number;
}

export function LatestAnalysesSection({ posts, maxPosts = 3 }: LatestAnalysesSectionProps) {
  const t = useTranslations("latestAnalyses");
  // Get the latest posts limited by maxPosts
  const latestPosts = posts.slice(0, maxPosts);

  return (
    <section className="relative px-4 py-24 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              {t.rich("title", {
                highlight: (chunks) => (
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.rich("description", {
                bold: (chunks) => (
                  <span className="font-semibold text-foreground">{chunks}</span>
                ),
              })}
            </p>
          </div>
        </BlurFade>

        {/* Articles List */}
        {latestPosts.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            {latestPosts.map((post, index) => (
              <BlurFade key={post.slug} delay={0.2 + index * 0.1} inView>
                <BlogCard post={post} />
              </BlurFade>
            ))}
          </div>
        ) : (
          <BlurFade delay={0.2} inView>
            <Empty className="py-12 border border-solid">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileText />
                </EmptyMedia>
                <EmptyTitle>{t("noArticles")}</EmptyTitle>
                <EmptyDescription>
                  {t("noArticlesDescription")}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </BlurFade>
        )}

        {/* CTA to see all articles */}
        {latestPosts.length > 0 && (
          <BlurFade delay={0.5} inView>
            <div className="text-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group"
              >
                <Link href="/blog">
                  {t("seeAll")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </BlurFade>
        )}
      </div>

      {/* Bottom gradient mask */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
