import { ImageResponse } from "next/og";

export const runtime = "edge";

const PRIMARY = "#1347e6";

const i18n = {
  fr: {
    text: "Analyse les SaaS qui",
    highlight: "rapportent vraiment de l'argent",
  },
  en: {
    text: "Analyze the SaaS that",
    highlight: "actually make money",
  },
} as const;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (locale !== "fr" && locale !== "en") {
    return new Response("Not found", { status: 404 });
  }

  const t = i18n[locale as keyof typeof i18n];
  const baseUrl = new URL(request.url).origin;

  const [bgImageData, logoData, geistRegular, geistBold] = await Promise.all([
    fetch(`${baseUrl}/og-background.png`).then((res) => res.arrayBuffer()),
    fetch(`${baseUrl}/logo.png`).then((res) => res.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-400-normal.woff"
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-700-normal.woff"
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
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
        {/* Background image */}
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

        {/* Blue glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(19, 71, 230, 0.18), transparent 70%)",
          }}
        />

        {/* Blue glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(19, 71, 230, 0.10), transparent 70%)",
          }}
        />

        {/* Top bar: logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "36px 52px 0 52px",
            position: "relative",
          }}
        >
          <img
            src={logoData as unknown as string}
            style={{ height: 58 }}
          />
        </div>

        {/* Main content: hero title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            padding: "0 52px 60px 52px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
              }}
            >
              {t.text}
            </span>
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: PRIMARY,
              }}
            >
              {t.highlight}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: geistRegular,
          weight: 400,
          style: "normal" as const,
        },
        {
          name: "Geist",
          data: geistBold,
          weight: 700,
          style: "normal" as const,
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
      },
    }
  );
}
