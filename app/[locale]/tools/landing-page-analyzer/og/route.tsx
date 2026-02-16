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
  PRIMARY,
  PRIMARY_25,
  TEXT,
  TEXT_MUTED,
} from "@/lib/og/shared";

export const runtime = "edge";

const i18n = {
  fr: {
    label: "Outil Gratuit",
    title: "Audit Copywriting\nLanding Page",
    subtitle:
      "Audite le copywriting de ta page en 30 secondes.\n10 critères analysés par IA avec recommandations concrètes.",
    bottom: "Essaie gratuitement sur",
  },
  en: {
    label: "Free Tool",
    title: "Landing Page\nCopywriting Audit",
    subtitle:
      "Audit your page's copywriting in 30 seconds.\n10 criteria analyzed by AI with concrete recommendations.",
    bottom: "Try for free on",
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

  // Criteria preview — the 10 criteria names
  const criteria =
    locale === "fr"
      ? [
          "Clarté 5 sec",
          "Audience cible",
          "Proposition de valeur",
          "CTA",
          "Preuve sociale",
        ]
      : [
          "5-sec Clarity",
          "Target Audience",
          "Value Proposition",
          "CTA",
          "Social Proof",
        ];

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
            padding: "0 52px",
            gap: 52,
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Left: text */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 16,
            }}
          >
            <OgLabel>{t.label}</OgLabel>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {t.title.split("\n").map((line) => (
                <span
                  key={line}
                  style={{
                    fontSize: 46,
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
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.5,
                color: TEXT_MUTED,
                maxWidth: 450,
              }}
            >
              {t.subtitle.replace("\n", " ")}
            </span>
          </div>

          {/* Right: criteria preview card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "24px 28px",
              borderRadius: 16,
              border: `1px solid ${PRIMARY_25}`,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              flexShrink: 0,
              width: 240,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: PRIMARY,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                marginBottom: 4,
              }}
            >
              {locale === "fr" ? "10 critères" : "10 criteria"}
            </span>
            {criteria.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: PRIMARY,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: TEXT,
                  }}
                >
                  {c}
                </span>
              </div>
            ))}
            <span
              style={{
                fontSize: 12,
                color: TEXT_MUTED,
                marginTop: 2,
              }}
            >
              {locale === "fr" ? "+ 5 autres" : "+ 5 more"}
            </span>
          </div>
        </div>

        <OgBottomBar text={t.bottom} />
      </OgWrapper>
    ),
    ogResponseOptions(geistRegular, geistBold)
  );
}
