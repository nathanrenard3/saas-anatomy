"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  /** Relative path (e.g. "/tools/.../report/123") or full URL. Resolved to absolute at click time. */
  path?: string;
  twitterText?: string;
}

export function ShareButton({ path, twitterText }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (!path) return window.location.href;
    if (path.startsWith("http")) return path;
    return `${window.location.origin}${path}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitter = () => {
    const tweetUrl = new URL("https://twitter.com/intent/tweet");
    tweetUrl.searchParams.set("url", getUrl());
    if (twitterText) {
      tweetUrl.searchParams.set("text", twitterText);
    }
    window.open(tweetUrl.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-2"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Lien copié !
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Copier le lien
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitter}
        className="gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
        Partager sur X
      </Button>
    </div>
  );
}
