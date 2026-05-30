import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, contact, course } = await request.json();

    // Basic validation
    if (!name || !contact || !course) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      // In development or if not configured, log and return success to avoid blocking user flow
      console.warn("[WARNING] RESEND_API_KEY is not defined. Email was not sent.");
      return NextResponse.json({ success: true, warning: "RESEND_API_KEY is not defined" });
    }

    // Map course key to friendly Slovak name
    const courseMap: Record<string, string> = {
      svadba: "Svadobný tanec",
      latinfit: "Latin Fit",
      senior: "Spoločenské tance pre seniorov",
      venceky: "Venčekové slávnosti",
      vystupenie: "Tanečné vystúpenie",
      ine: "Iná požiadavka..."
    };

    const friendlyCourse = courseMap[course] || course;

    // Premium designed HTML email layout
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #c4b5a9; border-radius: 16px; background-color: #0d0d0d; color: #ffffff;">
        <h2 style="font-family: serif; color: #d4af37; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 12px; margin-bottom: 20px; font-weight: normal; letter-spacing: 1px;">Nová správa z webu Ellegance</h2>
        <div style="line-height: 1.6; font-size: 14px;">
          <p style="margin: 12px 0;"><strong style="color: #d4af37; min-width: 140px; display: inline-block;">Meno a priezvisko:</strong> <span style="color: #e5e7eb;">${name}</span></p>
          <p style="margin: 12px 0;"><strong style="color: #d4af37; min-width: 140px; display: inline-block;">E-mail / Telefón:</strong> <span style="color: #e5e7eb;">${contact}</span></p>
          <p style="margin: 12px 0;"><strong style="color: #d4af37; min-width: 140px; display: inline-block;">Vybraný kurz:</strong> <span style="color: #d4af37; font-style: italic;">${friendlyCourse}</span></p>
        </div>
        <hr style="border: 0; border-top: 1px solid rgba(212,175,55,0.1); margin: 25px 0;" />
        <p style="font-size: 11px; color: #8c7e74; text-align: center; margin: 0;">Tento e-mail bol automaticky vygenerovaný z kontaktného formulára na ellegance.sk</p>
      </div>
    `;

    // Send via Resend REST API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "TK Ellegance Web <onboarding@resend.dev>", // Update to custom domain e.g. web@ellegance.sk once domain is added in Resend
        to: process.env.NOTIFICATION_EMAIL || "info@tkellegance.sk",
        subject: `Nová správa z webu Ellegance od ${name}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API Error details:", errorData);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send email route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
