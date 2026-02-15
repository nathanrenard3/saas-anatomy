"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const locales = [
  { code: "fr" as const, flag: "\u{1F1EB}\u{1F1F7}", label: "Fran\u00e7ais" },
  { code: "en" as const, flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(code: "fr" | "en") {
    setIsOpen(false);
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-border/60 bg-background/90 hover:bg-muted/50 transition-colors cursor-pointer"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-muted-foreground">{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-1 left-0 min-w-[160px] rounded-lg border border-border bg-background shadow-lg py-1 z-50">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer ${
                l.code === locale
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted/50 text-foreground"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
