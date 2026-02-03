"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButtonLink } from "@/components/ui/cta-button";
import { Menu, X } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="md:hidden relative z-50 flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/90 backdrop-blur-sm transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 shadow-sm hover:shadow-md hover:shadow-primary/10"
      aria-label="Toggle menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </motion.div>
    </motion.button>
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
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md md:hidden"
            style={{ top: "80px" }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-50 bg-gradient-to-b from-background via-background to-background/95 backdrop-blur-2xl shadow-2xl shadow-primary/5 md:hidden border-b border-border/40"
          >
            {/* Enhanced gradient glow at top */}
            <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_50%_-20%,hsl(var(--primary)/0.1),transparent_60%)] blur-xl" />

            {/* Top glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Corner accents */}
            <div className="absolute left-6 top-0 w-px h-4 bg-gradient-to-b from-primary/50 to-transparent" />
            <div className="absolute right-6 top-0 w-px h-4 bg-gradient-to-b from-primary/50 to-transparent" />

            <nav className="relative px-6 py-8 space-y-6">
              {/* Temporarily commented out until we have more articles */}
              {/* <div className="border-t border-border/40 pt-6 space-y-3">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Articles en vedette
                </p>
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={onClose}
                      className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20"
                    >
                      {post.title}
                    </Link>
                  </motion.div>
                ))}
              </div> */}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-2"
              >
                <CTAButtonLink
                  href="/blog"
                  className="w-full shadow-lg shadow-primary/20"
                  size="default"
                  onClick={onClose}
                >
                  En apprendre plus
                </CTAButtonLink>
              </motion.div>
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
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-2xl"
      >
        {/* Multi-layer radial gradient background for depth */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_-20%,hsl(var(--primary)/0.25),transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_-50%,hsl(var(--primary)/0.15),transparent_50%)] blur-xl" />

        {/* Subtle top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Enhanced decorative corner accents with vertical lines */}
        <div className="absolute left-8 bottom-0 h-px w-20 bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" />
        <div className="absolute right-8 bottom-0 h-px w-20 bg-gradient-to-l from-primary/50 via-primary/30 to-transparent" />
        <div className="absolute left-8 bottom-0 w-px h-3 bg-gradient-to-b from-primary/50 to-transparent" />
        <div className="absolute right-8 bottom-0 w-px h-3 bg-gradient-to-b from-primary/50 to-transparent" />

        {/* Ambient shadow below navbar */}
        <div className="absolute inset-x-0 -bottom-8 h-8 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo with enhanced hover effect */}
          <Link
            href="/"
            className="relative flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/logo.png"
                alt="SaaS Anatomy"
                width={280}
                height={64}
                className="h-14 w-auto transition-all duration-300 group-hover:brightness-110"
                priority
              />
            </motion.div>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-primary/10 rounded-full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Temporarily commented out until we have more articles */}
            {/* {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="relative px-5 py-2.5 text-sm font-medium rounded-full hover:bg-primary/5 transition-all duration-300 max-w-[200px] truncate group overflow-hidden"
                title={post.title}
              >
                <span className="relative z-10">{post.title}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))} */}
          </nav>

          {/* Right Side with enhanced spacing */}
          <div className="flex items-center gap-4">
            <CTAButtonLink
              href="/blog"
              className="hidden md:flex shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow duration-300"
              size="sm"
            >
              En apprendre plus
            </CTAButtonLink>
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

      {/* Enhanced spacer with subtle gradient */}
      <div className="h-20">
        <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
      </div>
    </>
  );
}
