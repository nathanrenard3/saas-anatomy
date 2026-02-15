"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";

interface BlogTagsFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function BlogTagsFilter({ tags, selectedTag, onTagSelect }: BlogTagsFilterProps) {
  const t = useTranslations('blog');
  if (tags.length === 0) return null;

  return (
    <div className="mb-12 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant={selectedTag === null ? "default" : "outline"}
          size="sm"
          onClick={() => onTagSelect(null)}
          className="rounded-full"
        >
          {t('allPosts')}
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
            className="rounded-full"
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}
