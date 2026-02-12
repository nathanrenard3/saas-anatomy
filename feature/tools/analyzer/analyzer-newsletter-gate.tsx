"use client";

import { useState } from "react";
import { CTAButton } from "@/components/ui/cta-button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AnalyzerNewsletterGateProps {
  analysisId: string;
  onUnlock: () => void;
}

export function AnalyzerNewsletterGate({
  analysisId,
  onUnlock,
}: AnalyzerNewsletterGateProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tools/analyze/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, analysisId, website }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription");
      }

      onUnlock();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    {
      label: "YouTube",
      href: "https://youtube.com/@saasanatomy?si=wQ4_aOvHcwyfYuAS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com/saasanatomy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/saas-anatomy/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@saas_anatomy",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative my-8">
      {/* Gradient overlay effect */}
      <div className="absolute -top-16 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-background to-primary/5 p-8 md:p-10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-6 text-center">
          {/* Lock icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20">
            <Lock className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Débloquez l&apos;analyse{" "}
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                complète
              </span>
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Accédez aux 6 critères restants et à des suggestions de
              réécriture personnalisées pour améliorer votre page.
            </p>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-3">
            <div className="flex gap-3">
              {/* Honeypot field — invisible to humans, bots fill it */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute opacity-0 pointer-events-none"
              />
              <Input
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="flex-1 h-11 bg-background border-border focus:border-primary transition-colors"
              />
              <CTAButton
                type="submit"
                size="default"
                disabled={isLoading || !email.trim()}
                className="h-11 px-5"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? "..." : "Voir tout"}
              </CTAButton>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Pas de spam. Désinscription en un clic.
            </p>
          </form>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="text-xs text-muted-foreground">Suivez-nous</span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
