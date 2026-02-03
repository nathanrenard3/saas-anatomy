"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { BlogPost } from "@/lib/blog";

interface RelatedPostsSidebarProps {
  posts: BlogPost[];
  currentSlug: string;
  maxPosts?: number;
}

export function RelatedPostsSidebar({ posts, currentSlug, maxPosts = 5 }: RelatedPostsSidebarProps) {
  const relatedPosts = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, maxPosts);

  return (
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
  );
}
