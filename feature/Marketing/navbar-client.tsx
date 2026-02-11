"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButtonLink } from "@/components/ui/cta-button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, Search } from "lucide-react";
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
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
              >
                <span className="block px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Outils gratuits
                </span>
                <Link
                  href="/tools/landing-page-analyzer"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  <Search className="w-4 h-4 text-primary" />
                  Analyse de copywriting
                </Link>
              </motion.div>

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
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center gap-8">
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
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-primary/5 data-[state=open]:bg-primary/5">
                  Outils gratuits
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[300px] p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/tools/landing-page-analyzer"
                          className="flex-row items-center gap-3 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 shrink-0">
                            <Search className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm font-medium">Analyse de copywriting</span>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Évaluez votre copywriting avec l&apos;IA
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          </div>

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
