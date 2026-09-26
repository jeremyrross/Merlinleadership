import { NextRequest, NextResponse } from "next/server";
import { buildWelcomeEmail, getWelcomeArticles } from "@/lib/welcome-email";

// Local-only preview of the welcome email. Disabled in production.
// /api/dev/welcome-email            -> view the email
// /api/dev/welcome-email?send=you@x -> also sends a real test to that address
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const baseUrl = req.nextUrl.origin;
  const email = buildWelcomeEmail({ baseUrl, articles: await getWelcomeArticles() });

  const sendTo = req.nextUrl.searchParams.get("send");
  if (sendTo) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 });
    // Local links would be dead in a real inbox, so test sends use the live site URL.
    const { site } = await import("@/lib/site");
    const live = buildWelcomeEmail({ baseUrl: site.url, articles: await getWelcomeArticles() });
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Jeremy Ross <${site.email}>`,
        to: [sendTo],
        reply_to: site.email,
        subject: `[TEST] ${live.subject}`,
        html: live.html,
        text: live.text,
      }),
    });
    return NextResponse.json({ status: res.status, body: await res.json().catch(() => null) });
  }

  return new NextResponse(email.html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
