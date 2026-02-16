import { ImageResponse } from "next/og";
import {
  OgWrapper,
  OgBackground,
  OgCornerBrackets,
  OgLogo,
  OgLabel,
  OgBottomBar,
  loadOgAssets,
  ogResponseOptions,
  resolveLocale,
  TEXT,
  TEXT_MUTED,
} from "@/lib/og/shared";

export const runtime = "edge";

const i18n = {
  fr: {
    label: "Blog",
    title: "Guides et Stratégies\npour SaaS Rentables",
    subtitle:
      "Découvrez comment les SaaS les plus rentables génèrent du revenu.",
  },
  en: {
    label: "Blog",
    title: "Guides & Strategies\nfor Profitable SaaS",
    subtitle:
      "Discover how the most profitable SaaS generate revenue.",
  },
} as const;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = i18n[locale];
  const baseUrl = new URL(request.url).origin;

  const { bgImageData, logoData, geistRegular, geistBold } =
    await loadOgAssets(baseUrl);

  return new ImageResponse(
    (
      <OgWrapper>
        <OgBackground bgImageData={bgImageData} />
        <OgCornerBrackets />

        <OgLogo logoData={logoData} />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 52px",
            gap: 16,
            position: "relative",
          }}
        >
          <OgLabel>{t.label}</OgLabel>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {t.title.split("\n").map((line) => (
              <span
                key={line}
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  color: TEXT,
                }}
              >
                {line}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: 20,
              fontWeight: 400,
              lineHeight: 1.4,
              color: TEXT_MUTED,
              maxWidth: 600,
            }}
          >
            {t.subtitle}
          </span>
        </div>

        <OgBottomBar domain="saas-anatomy.com" />
      </OgWrapper>
    ),
    ogResponseOptions(geistRegular, geistBold)
  );
}
