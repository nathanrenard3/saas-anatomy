import type { ReactElement } from "react";

/* ───────────────────────────── Constants ───────────────────────────── */

export const PRIMARY = "#1347e6";
export const PRIMARY_25 = "rgba(19, 71, 230, 0.25)";
export const PRIMARY_12 = "rgba(19, 71, 230, 0.12)";
export const PRIMARY_08 = "rgba(19, 71, 230, 0.08)";
export const PRIMARY_04 = "rgba(19, 71, 230, 0.04)";

export const TEXT = "#0a0a0a";
export const TEXT_MUTED = "rgba(10, 10, 10, 0.50)";
export const TEXT_SUBTLE = "rgba(10, 10, 10, 0.35)";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const FONT_URLS = {
  regular:
    "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-400-normal.woff",
  bold: "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-700-normal.woff",
};

/* ──────────────────────────── Asset Loading ──────────────────────────── */

export type OgAssets = {
  bgImageData: ArrayBuffer;
  logoData: ArrayBuffer;
  geistRegular: ArrayBuffer;
  geistBold: ArrayBuffer;
};

export async function loadOgAssets(baseUrl: string): Promise<OgAssets> {
  const [bgImageData, logoData, geistRegular, geistBold] = await Promise.all([
    fetch(`${baseUrl}/og-background.png`).then((res) => res.arrayBuffer()),
    fetch(`${baseUrl}/logo.png`).then((res) => res.arrayBuffer()),
    fetch(FONT_URLS.regular).then((res) => res.arrayBuffer()),
    fetch(FONT_URLS.bold).then((res) => res.arrayBuffer()),
  ]);

  return { bgImageData, logoData, geistRegular, geistBold };
}

/* ───────────────────────── ImageResponse Config ─────────────────────── */

export function ogResponseOptions(
  regular: ArrayBuffer,
  bold: ArrayBuffer,
  cacheMaxAge = 604800
) {
  return {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      {
        name: "Geist",
        data: regular,
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: "Geist",
        data: bold,
        weight: 700 as const,
        style: "normal" as const,
      },
    ],
    headers: {
      "Cache-Control": `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}`,
    },
  };
}

/* ─────────────────────── Shared JSX Components ──────────────────────── */

/** Full-bleed background: grid stripes PNG + two radial gradient glows */
export function OgBackground({
  bgImageData,
}: {
  bgImageData: ArrayBuffer;
}): ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      {/* Grid stripes from PNG */}
      <img
        src={bgImageData as unknown as string}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Bottom-left radial glow — signature accent */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -60,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(19, 71, 230, 0.22), transparent 65%)",
        }}
      />

      {/* Top-right radial glow — subtle accent */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -40,
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(19, 71, 230, 0.10), transparent 60%)",
        }}
      />
    </div>
  );
}

/** Four decorative L-shaped corner brackets */
export function OgCornerBrackets(): ReactElement {
  const size = 28;
  const offset = 28;
  const border = `2px solid ${PRIMARY_25}`;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      {/* Top-left */}
      <div
        style={{
          position: "absolute",
          top: offset,
          left: offset,
          width: size,
          height: size,
          borderLeft: border,
          borderTop: border,
        }}
      />
      {/* Top-right */}
      <div
        style={{
          position: "absolute",
          top: offset,
          right: offset,
          width: size,
          height: size,
          borderRight: border,
          borderTop: border,
        }}
      />
      {/* Bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 68,
          left: offset,
          width: size,
          height: size,
          borderLeft: border,
          borderBottom: border,
        }}
      />
      {/* Bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 68,
          right: offset,
          width: size,
          height: size,
          borderRight: border,
          borderBottom: border,
        }}
      />
    </div>
  );
}

/** Logo row — top-left */
export function OgLogo({
  logoData,
}: {
  logoData: ArrayBuffer;
}): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "40px 52px 0 52px",
        position: "relative",
      }}
    >
      <img
        src={logoData as unknown as string}
        style={{ height: 52 }}
      />
    </div>
  );
}

/** Bottom branded bar */
export function OgBottomBar({
  text,
  domain = "saas-anatomy.com",
}: {
  text?: string;
  domain?: string;
}): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 52px",
        background: `linear-gradient(to right, ${PRIMARY_04}, ${PRIMARY_12}, ${PRIMARY_04})`,
        borderTop: `1px solid ${PRIMARY_08}`,
        gap: 8,
      }}
    >
      {text && (
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: TEXT_SUBTLE,
          }}
        >
          {text}
        </span>
      )}
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: PRIMARY,
        }}
      >
        {domain}
      </span>
    </div>
  );
}

/** Uppercase label (e.g. "BLOG", "OUTIL GRATUIT") */
export function OgLabel({ children }: { children: string }): ReactElement {
  return (
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: PRIMARY,
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
      }}
    >
      {children}
    </span>
  );
}

/** Page wrapper — consistent base for all OG images */
export function OgWrapper({
  children,
}: {
  children: ReactElement | ReactElement[];
}): ReactElement {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0a0a",
        fontFamily: "Geist",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────── Helpers ─────────────────────────── */

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "\u2026";
}

export type Locale = "fr" | "en";

export function resolveLocale(locale: string): Locale {
  return locale === "en" ? "en" : "fr";
}
