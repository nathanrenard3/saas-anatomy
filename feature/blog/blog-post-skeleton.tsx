export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,hsl(var(--primary)/0.1),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-8 md:py-12 mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-8 animate-pulse">
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="h-4 w-4 bg-muted rounded" />
            <div className="h-4 w-12 bg-muted rounded" />
            <div className="h-4 w-4 bg-muted rounded" />
            <div className="h-4 w-48 bg-muted rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Content Skeleton */}
            <article className="min-w-0 animate-pulse">
              {/* Header Skeleton */}
              <header className="mb-12 space-y-6">
                {/* Tags */}
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-muted rounded-full" />
                  <div className="h-6 w-24 bg-muted rounded-full" />
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <div className="h-12 bg-muted rounded w-full" />
                  <div className="h-12 bg-muted rounded w-4/5" />
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4">
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-4 w-40 bg-muted rounded" />
                </div>

                <div className="h-px bg-border" />
              </header>

              {/* Content Skeleton */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-4/5" />
                </div>
                <div className="h-8 bg-muted rounded w-2/3" />
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            </article>

            {/* Sidebar Skeleton */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-6 animate-pulse">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                <div className="h-6 w-40 bg-muted rounded mb-6" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-3">
                      <div className="h-5 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                      <div className="h-3 bg-muted rounded w-20" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-background p-6 space-y-4">
                <div className="h-6 bg-muted rounded w-32" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-10 bg-muted rounded-full w-full" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
