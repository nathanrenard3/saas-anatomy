import { NextResponse } from "next/server";

export function mapScrapeError(error: unknown): NextResponse {
  const message = error instanceof Error ? error.message : "scrape:unknown";

  if (message.includes("timeout")) {
    return NextResponse.json(
      { error: "timeout" },
      { status: 408 }
    );
  }
  if (message.includes("private-ip") || message.includes("invalid-protocol")) {
    return NextResponse.json(
      { error: "invalidUrl" },
      { status: 400 }
    );
  }
  if (message.includes("not-html")) {
    return NextResponse.json(
      { error: "notHtml" },
      { status: 422 }
    );
  }
  if (message.includes("empty-page")) {
    return NextResponse.json(
      { error: "emptyPage" },
      { status: 422 }
    );
  }
  return NextResponse.json(
    { error: "cantAccess" },
    { status: 422 }
  );
}

export function parseUrl(url: string): URL | null {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
