import { ImageResponse } from "next/og";
import { getAnalysisById } from "@/lib/analyzer/storage";

export const runtime = "edge";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function scoreToGrade(score: number): string {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  if (score >= 20) return "D";
  return "F";
}

function scoreToColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#eab308";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

export async function GET(
  _request: Request,
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
  const grade = scoreToGrade(score);
  const color = scoreToColor(score);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top branding */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 40,
            left: 60,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            SaaS Anatomy
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 44,
            right: 60,
          }}
        >
          <span
            style={{
              color: "#888888",
              fontSize: 18,
              border: "1px solid #333",
              borderRadius: 20,
              padding: "6px 16px",
            }}
          >
            Audit Copywriting
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Score circle */}
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: `8px solid ${color}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: `radial-gradient(circle, ${color}15, transparent)`,
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: color,
                lineHeight: 1,
              }}
            >
              {score}
            </span>
            <span style={{ fontSize: 18, color: "#666666", marginTop: 4 }}>
              /100
            </span>
          </div>

          {/* Domain */}
          <span
            style={{
              fontSize: 40,
              color: "#ffffff",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            {analysis.domain}
          </span>

          {/* Grade */}
          <span style={{ fontSize: 22, color: "#888888" }}>
            Note globale : {grade}
          </span>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
          }}
        >
          <span style={{ color: "#555555", fontSize: 18 }}>
            saas-anatomy.com/tools/landing-page-analyzer
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}
