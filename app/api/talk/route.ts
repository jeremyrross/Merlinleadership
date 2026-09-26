import { NextRequest, NextResponse } from "next/server";
import { sendTalkRequestEmails } from "@/lib/talk-email";
import { clientIp, hashKey, withinLimit } from "@/lib/rate-limit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { name, email, message, token } = await req.json();

  if (typeof name !== "string" || name.length > 200) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (typeof message !== "string" || message.length > 4000) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  // Cheap checks first: 5 requests per IP per hour.
  if (!(await withinLimit(`talk:ip:${clientIp(req)}`, 5, 3600))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

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

  // Each address gets at most 2 requests a day, so nobody can be email-bombed
  // through this form. Extra attempts quietly succeed without sending anything.
  if (!(await withinLimit(`talk:email:${hashKey(email)}`, 2, 86400))) {
    return NextResponse.json({ success: true });
  }

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  // Forward to Formspree: this is the record of every /talk submission.
  const formRes = await fetch("https://formspree.io/f/mvkgrwzp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: trimmedName, email, message: trimmedMessage }),
  });

  if (!formRes.ok) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }

  // The submission is already recorded; a failed email must not undo that.
  try {
    await sendTalkRequestEmails({ name: trimmedName, email, message: trimmedMessage });
  } catch (error) {
    console.error("[talk] failed to send:", error);
  }

  return NextResponse.json({ success: true });
}
