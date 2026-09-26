import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/welcome-email";
import { clientIp, hashKey, withinLimit } from "@/lib/rate-limit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email, token } = await req.json();

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Cheap checks first: 5 signups per IP per hour.
  if (!(await withinLimit(`sub:ip:${clientIp(req)}`, 5, 3600))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Verify Turnstile token
  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  );
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return NextResponse.json({ error: "CAPTCHA failed" }, { status: 400 });
  }

  // Each address gets at most 2 signups a day, so nobody can be email-bombed
  // through this form. Extra attempts quietly succeed without sending anything.
  if (!(await withinLimit(`sub:email:${hashKey(email)}`, 2, 86400))) {
    return NextResponse.json({ success: true });
  }

  // Forward to Formspree: stores the subscriber and notifies you.
  const formRes = await fetch("https://formspree.io/f/xqegdyle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!formRes.ok) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }

  // The signup already succeeded; a failed welcome email must not undo that.
  try {
    await sendWelcomeEmail(email);
  } catch (error) {
    console.error("[welcome-email] failed to send:", error);
  }

  return NextResponse.json({ success: true });
}
