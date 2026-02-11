"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, ReactNode } from "react";

interface FooterProps {
  latestPosts?: Array<{ slug: string; title: string }>;
}

function AnimatedSocialIcon({
  icon,
  isHovered
}: {
  icon: ReactNode;
  isHovered: boolean;
}) {
  return (
    <span className="relative inline-flex h-5 w-5 overflow-hidden">
      <motion.span
        className="absolute inset-0 inline-flex items-center justify-center"
        animate={{
          translateY: isHovered ? "-110%" : "0%",
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {icon}
      </motion.span>
      <motion.span
        className="absolute inset-0 inline-flex items-center justify-center"
        animate={{
          translateY: isHovered ? "0%" : "110%",
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {icon}
      </motion.span>
    </span>
  );
}

function SocialLink({
  href,
  icon,
  label
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary/80 transition-colors"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedSocialIcon icon={icon} isHovered={isHovered} />
    </Link>
  );
}

export function Footer({ latestPosts = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    articles: latestPosts.slice(0, 5),
    legal: [
      { label: "Mentions légales", href: "/legal" },
      { label: "Politique de confidentialité", href: "/privacy" },
    ],
    social: [
      {
        label: "YouTube",
        href: "https://youtube.com/@saasanatomy?si=wQ4_aOvHcwyfYuAS",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
          </svg>
        )
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@saas_anatomy",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
          </svg>
        )
      },
      {
        label: "X",
        href: "https://x.com/saasanatomy",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
          </svg>
        )
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/saas-anatomy/?viewAsMember=true",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
          </svg>
        )
      },
    ],
  };


  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-12">
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
            <div className="lg:justify-self-end">
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

          {/* Tools */}
          <div className="lg:justify-self-end">
            <h4 className="font-semibold text-foreground mb-4">Outils gratuits</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools/landing-page-analyzer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Analyse de copywriting
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:justify-self-end">
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

          {/* Social Media Links */}
          <div className="lg:justify-self-end">
            <h4 className="font-semibold text-foreground mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <SocialLink
                  key={social.label}
                  href={social.href}
                  icon={social.icon}
                  label={social.label}
                />
              ))}
            </div>
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
