import { ImageResponse } from "next/og";
import {
  OgWrapper,
  OgBackground,
  OgCornerBrackets,
  OgLogo,
  OgBottomBar,
  loadOgAssets,
  ogResponseOptions,
  resolveLocale,
  PRIMARY,
  TEXT,
  TEXT_MUTED,
} from "@/lib/og/shared";

export const runtime = "edge";

const i18n = {
  fr: {
    text: "Analyse les SaaS qui",
    highlight: "rapportent vraiment de l'argent",
    subtitle: "Le guide pour passer du side project aux vrais revenus",
    bottom: "Découvre les coulisses sur",
  },
  en: {
    text: "Analyze the SaaS that",
    highlight: "actually make money",
    subtitle: "The guide to going from side project to real revenue",
    bottom: "Go behind the scenes on",
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
            alignItems: "center",
            padding: "0 52px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: TEXT,
              }}
            >
              {t.text}
            </span>
            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: PRIMARY,
              }}
            >
              {t.highlight}
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.4,
                color: TEXT_MUTED,
                marginTop: 8,
              }}
            >
              {t.subtitle}
            </span>
          </div>
        </div>

        <OgBottomBar text={t.bottom} />
      </OgWrapper>
    ),
    ogResponseOptions(geistRegular, geistBold)
  );
}
