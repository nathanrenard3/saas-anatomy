"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative z-50 flex size-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent"
      aria-label="Toggle menu"
    >
      {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}

function MobileNav({
  isOpen,
  onClose,
  featuredPosts,
}: {
  isOpen: boolean;
  onClose: () => void;
  featuredPosts: BlogPost[];
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            style={{ top: "64px" }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-50 bg-gradient-to-b from-background via-background to-background/95 backdrop-blur-xl shadow-2xl md:hidden border-b border-border/40"
          >
            {/* Subtle gradient glow at top */}
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.1),transparent)]" />

            <nav className="relative px-6 py-6 space-y-4">
              <Link
                href="/blog"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-lg hover:bg-accent hover:text-primary transition-all duration-200"
              >
                <BookOpen className="size-5" />
                Tous les articles
              </Link>

              <div className="border-t border-border/40 pt-4 space-y-2">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Articles en vedette
                </p>
                {featuredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-primary transition-all duration-200"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-b from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/20"
                  size="lg"
                >
                  <Link href="/blog" onClick={onClose}>
                    En apprendre plus
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function NavbarClient({ featuredPosts }: { featuredPosts: BlogPost[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl shadow-sm shadow-black/5 dark:shadow-white/5"
      >
        {/* Radial gradient background glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.15),transparent_50%)]" />

        {/* Decorative corner accents */}
        <div className="absolute left-8 bottom-0 h-px w-16 bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="absolute right-8 bottom-0 h-px w-16 bg-gradient-to-l from-primary/40 to-transparent" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="SaaS Anatomy"
              width={280}
              height={64}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Temporarily commented out until we have more articles */}
            {/* {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="px-4 py-2 text-sm font-medium rounded-full hover:bg-accent transition-all duration-200 max-w-[200px] truncate"
                title={post.title}
              >
                {post.title}
              </Link>
            ))} */}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden md:flex rounded-full bg-gradient-to-b from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background transition-all duration-200 hover:scale-105"
              size="default"
            >
              <Link href="/blog">
                En apprendre plus
              </Link>
            </Button>
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>

        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          featuredPosts={featuredPosts}
        />
      </motion.header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16" />
    </>
  );
}
