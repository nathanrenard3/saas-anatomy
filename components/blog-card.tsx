"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 ${className || ''}`}
    >
      {/* Square thumbnail image on the left */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-linear-to-br from-primary/20 via-primary/10 to-background">
        <Image
          src={post.image || "/images/default-thumb.webp"}
          alt={`Cover image for: ${post.title}`}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content on the right */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Title */}
        <h3 className="text-base font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Meta information */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readingTime}</span>
          </div>
          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      </div>
    </Link>
  );
}
