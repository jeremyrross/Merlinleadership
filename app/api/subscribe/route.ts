import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, token } = await req.json();

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

  // Forward to Formspree
  const formRes = await fetch("https://formspree.io/f/xqegdyle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!formRes.ok) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
