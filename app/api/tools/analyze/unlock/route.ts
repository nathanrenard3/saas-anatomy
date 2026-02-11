import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { subscribeToBrevo } from "@/lib/analyzer/brevo";
import { findOrCreateLead, linkLeadToAnalysis } from "@/lib/analyzer/lead";

export async function POST(request: NextRequest) {
  try {
    const { email, analysisId } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    await subscribeToBrevo(email);

    const leadId = await findOrCreateLead(email);

    if (analysisId) {
      await linkLeadToAnalysis(analysisId, leadId);
    }

    const cookieStore = await cookies();
    cookieStore.set("lead_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unlock error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
