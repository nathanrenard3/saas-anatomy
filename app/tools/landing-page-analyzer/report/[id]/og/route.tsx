import { ImageResponse } from "next/og";
import { getAnalysisById } from "@/lib/analyzer/storage";

export const runtime = "edge";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Primary color: oklch(0.488 0.243 264.376) ≈ #1347e6
const PRIMARY = "#1347e6";

function getScoreColor(score: number): string {
  if (score >= 70) return "#22c55e";
  if (score >= 60) return "#eab308";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "\u2026";
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
            style={{ height: 44 }}
          />
        </div>

        {/* Main content: score + text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            padding: "0 52px",
            gap: 52,
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
                width: 190,
                height: 190,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="190"
                height="190"
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
                    fontSize: 58,
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
            {/* Label */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: PRIMARY,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
              }}
            >
              Audit Copywriting
            </span>

            {/* Domain */}
            <span
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#0a0a0a",
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
                  color: "rgba(0, 0, 0, 0.5)",
                  lineHeight: 1.4,
                }}
              >
                {resume}
              </span>
            )}

            {/* Strengths & Weaknesses */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
              {/* Points forts */}
              {strengths.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#15803d" }}>
                    Points forts
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {strengths.map((s: string) => (
                      <div
                        key={s}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: 20,
                          border: "1px solid rgba(34, 197, 94, 0.3)",
                        }}
                      >
                        <span style={{ fontSize: 12, color: "#15803d", fontWeight: 500 }}>
                          {truncate(s, 28)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Points faibles */}
              {weaknesses.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#c2410c" }}>
                    Points faibles
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {weaknesses.map((w: string) => (
                      <div
                        key={w}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: 20,
                          border: "1px solid rgba(249, 115, 22, 0.3)",
                        }}
                      >
                        <span style={{ fontSize: 12, color: "#c2410c", fontWeight: 500 }}>
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

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 52px",
            background:
              "linear-gradient(to right, rgba(19, 71, 230, 0.04), rgba(19, 71, 230, 0.10), rgba(19, 71, 230, 0.04))",
            borderTop: "1px solid rgba(19, 71, 230, 0.08)",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.45)",
            }}
          >
            Analyse ta landing page gratuitement sur
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: PRIMARY,
            }}
          >
            saas-anatomy.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" as const },
        { name: "Geist", data: geistBold, weight: 700, style: "normal" as const },
      ],
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}
