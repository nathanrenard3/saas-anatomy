"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  latestPosts?: Array<{ slug: string; title: string }>;
}

export function Footer({ latestPosts = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    articles: latestPosts.slice(0, 5),
    legal: [
      { label: "Mentions légales", href: "/legal" },
      { label: "Politique de confidentialité", href: "/privacy" },
    ],
  };


  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="SaaS Anatomy"
                width={300}
                height={68}
                className="h-14 w-auto md:h-16"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Analyse des SaaS rentables pour t'aider à construire ton propre business digital.
            </p>
          </div>

          {/* Latest Articles */}
          {latestPosts.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-4">Derniers articles</h4>
              <ul className="space-y-3">
                {footerLinks.articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors line-clamp-1"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} SaaS Anatomy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
