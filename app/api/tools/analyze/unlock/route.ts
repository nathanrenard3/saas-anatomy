import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { subscribeToBrevo } from "@/lib/analyzer/brevo";
import { findOrCreateLead, linkLeadToAnalysis } from "@/lib/analyzer/lead";
import { validateEmail, isHoneypotFilled } from "@/lib/email-validation";

export async function POST(request: NextRequest) {
  try {
    const { email, analysisId, website } = await request.json();

    // Honeypot check — silently succeed to not alert bots
    if (isHoneypotFilled(website)) {
      return NextResponse.json({ success: true });
    }

    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    await subscribeToBrevo(validation.email!);

    const leadId = await findOrCreateLead(validation.email!);

    if (analysisId) {
      await linkLeadToAnalysis(analysisId, leadId);
    }

    const cookieStore = await cookies();
    cookieStore.set("lead_email", validation.email!, {
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
      { error: "subscriptionError" },
      { status: 500 }
    );
  }
}
