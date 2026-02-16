import { ImageResponse } from "next/og";
import { getAnalysisById } from "@/lib/analyzer/storage";
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
  truncate,
  TEXT,
  TEXT_MUTED,
} from "@/lib/og/shared";

export const runtime = "edge";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getScoreColor(score: number): string {
  if (score >= 70) return "#22c55e";
  if (score >= 60) return "#eab308";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

const i18n = {
  fr: {
    label: "Audit Copywriting",
    strengths: "Points forts",
    weaknesses: "Points faibles",
    cta: "Analyse ta landing page gratuitement sur",
  },
  en: {
    label: "Copywriting Audit",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    cta: "Analyze your landing page for free on",
  },
} as const;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string; id: string }> }
) {
  const { locale: rawLocale, id } = await params;
  const locale = resolveLocale(rawLocale);
  const t = i18n[locale];

  if (!UUID_REGEX.test(id)) {
    return new Response("Not found", { status: 404 });
  }

  const analysis = await getAnalysisById(id);

  if (!analysis) {
    return new Response("Not found", { status: 404 });
  }

  const score = analysis.overallScore;
  const color = getScoreColor(score);

  const analysisResult = analysis.analysisResult as {
    resume: string;
    points_forts: string[];
    points_faibles: string[];
  };

  const resume = truncate(analysisResult.resume ?? "", 100);
  const strengths = (analysisResult.points_forts ?? []).slice(0, 3);
  const weaknesses = (analysisResult.points_faibles ?? []).slice(0, 2);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const baseUrl = new URL(request.url).origin;

  const { bgImageData, logoData, geistRegular, geistBold } =
    await loadOgAssets(baseUrl);

  return new ImageResponse(
    (
      <OgWrapper>
        <OgBackground bgImageData={bgImageData} />
        <OgCornerBrackets />

        <OgLogo logoData={logoData} />

        {/* Main content: score + text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            padding: "0 52px",
            gap: 48,
            position: "relative",
          }}
        >
          {/* Left: SVG score ring */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 200,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 120 120"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.06)"
                  strokeWidth="7"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={`${offset}`}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 62,
                    fontWeight: 700,
                    color: color,
                    lineHeight: 1,
                  }}
                >
                  {score}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.3)",
                    marginTop: 2,
                  }}
                >
                  / 100
                </span>
              </div>
            </div>
          </div>

          {/* Right: text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 14,
              minWidth: 0,
            }}
          >
            <OgLabel>{t.label}</OgLabel>

            {/* Domain */}
            <span
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: TEXT,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap" as const,
              }}
            >
              {analysis.domain}
            </span>

            {/* Resume */}
            {resume && (
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 400,
                  color: TEXT_MUTED,
                  lineHeight: 1.4,
                }}
              >
                {resume}
              </span>
            )}

            {/* Strengths & Weaknesses */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 4,
              }}
            >
              {strengths.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#15803d",
                    }}
                  >
                    {t.strengths}
                  </span>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                  >
                    {strengths.map((s: string) => (
                      <div
                        key={s}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: 20,
                          border: "1px solid rgba(34, 197, 94, 0.3)",
                          backgroundColor: "rgba(34, 197, 94, 0.04)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "#15803d",
                            fontWeight: 500,
                          }}
                        >
                          {truncate(s, 28)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {weaknesses.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#c2410c",
                    }}
                  >
                    {t.weaknesses}
                  </span>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                  >
                    {weaknesses.map((w: string) => (
                      <div
                        key={w}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: 20,
                          border: "1px solid rgba(249, 115, 22, 0.3)",
                          backgroundColor: "rgba(249, 115, 22, 0.04)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "#c2410c",
                            fontWeight: 500,
                          }}
                        >
                          {truncate(w, 28)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <OgBottomBar text={t.cta} />
      </OgWrapper>
    ),
    ogResponseOptions(geistRegular, geistBold, 86400)
  );
}
