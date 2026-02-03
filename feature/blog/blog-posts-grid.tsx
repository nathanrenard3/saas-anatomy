"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { BlogPost } from "@/lib/blog";
import { useState } from "react";

interface BlogPostsGridProps {
  initialPosts: BlogPost[];
  tags: string[];
}

export function BlogPostsGrid({ initialPosts, tags }: BlogPostsGridProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? initialPosts.filter(post => post.tags?.includes(selectedTag))
    : initialPosts;

  return (
    <>
      {/* Tags Filter */}
      {tags.length > 0 && (
        <BlurFade delay={0.3} inView>
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Tous les articles
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <BlurFade delay={0.4} inView>
          <div className="text-center py-12 max-w-2xl mx-auto">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Aucun article pour le moment</h3>
            <p className="text-muted-foreground">
              Les premières analyses arrivent bientôt. Reviens vite pour découvrir les secrets des SaaS rentables !
            </p>
          </div>
        </BlurFade>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlurFade key={post.slug} delay={0.05 * (index + 1)} inView>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="relative rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-muted">
                      <Image
                        src={post.image || "/images/default-thumb.webp"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-full text-xs px-2 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          <span>{post.readingTime}</span>
                        </div>
                        <span className="text-border">•</span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                  </article>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
