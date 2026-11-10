import { site } from "@/lib/site";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background-color:#f7f7f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f7f6;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;border:1px solid #dcdcda;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="background-color:#0e0e0d;padding:24px 36px;">
            <span style="font-family:${SERIF};font-style:italic;font-size:20px;color:#ffffff;">${esc(site.name)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:36px;">
            ${bodyHtml}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export type TalkRequest = { name: string; email: string; company?: string; message: string };

export function buildTalkNotificationEmail(req: TalkRequest): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Request to connect: ${req.name || req.email}${req.company ? ` (${req.company})` : ""}`;
  const html = shell(`
    <h1 style="margin:0 0 20px 0;font-family:${SERIF};font-style:italic;font-weight:500;font-size:24px;color:#1a1a19;">New request to connect</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:${SANS};font-size:15px;color:#1a1a19;">
      <tr><td style="padding:6px 0;color:#737373;width:90px;">Name</td><td style="padding:6px 0;">${esc(req.name || "—")}</td></tr>
      <tr><td style="padding:6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(req.email)}" style="color:#08677b;">${esc(req.email)}</a></td></tr>
      ${req.company ? `<tr><td style="padding:6px 0;color:#737373;">Company</td><td style="padding:6px 0;">${esc(req.company)}</td></tr>` : ""}
    </table>
    ${
      req.message
        ? `<div style="margin-top:20px;padding:16px 18px;background:#f7f7f6;border-radius:10px;font-family:${SANS};font-size:15px;line-height:1.6;color:#2c2c2b;white-space:pre-wrap;">${esc(req.message)}</div>`
        : ""
    }
    <p style="margin:24px 0 0 0;font-family:${SANS};font-size:14px;color:#5b5b5a;">Reply to this email to reach them directly.</p>
  `);
  const text = [
    `New request to connect from ${req.name || "(no name)"} <${req.email}>`,
    ...(req.company ? [`Company or role: ${req.company}`] : []),
    "",
    req.message || "(no message)",
  ].join("\n");
  return { subject, html, text };
}

export function buildTalkConfirmationEmail(req: TalkRequest): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = req.name.split(" ")[0] || "";
  const subject = "Thanks for reaching out";
  const html = shell(`
    <h1 style="margin:0 0 18px 0;font-family:${SERIF};font-style:italic;font-weight:500;font-size:24px;color:#1a1a19;">${firstName ? `Thanks, ${esc(firstName)}.` : "Thanks for reaching out."}</h1>
    <p style="margin:0 0 14px 0;font-family:${SANS};font-size:16px;line-height:1.6;color:#2c2c2b;">I got your note, and I'll reply personally within two business days.</p>
    <p style="margin:0;font-family:${SANS};font-size:16px;line-height:1.6;color:#2c2c2b;">If anything else comes to mind before then, just reply to this email. It comes straight to me.</p>
    <p style="margin:24px 0 0 0;font-family:${SERIF};font-style:italic;font-size:18px;color:#1a1a19;">Jeremy</p>
  `);
  const text = [
    firstName ? `Thanks, ${firstName}.` : "Thanks for reaching out.",
    "",
    "I got your note, and I'll reply personally within two business days.",
    "",
    "If anything else comes to mind before then, just reply to this email. It comes straight to me.",
    "",
    "Jeremy",
  ].join("\n");
  return { subject, html, text };
}

async function sendResendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[talk-email] RESEND_API_KEY not set; skipping send");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Jeremy Ross <${site.email}>`,
      to: [payload.to],
      reply_to: payload.replyTo ?? site.email,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export async function sendTalkRequestEmails(req: TalkRequest): Promise<void> {
  const notify = buildTalkNotificationEmail(req);
  const confirm = buildTalkConfirmationEmail(req);

  await sendResendEmail({ to: site.email, replyTo: req.email, ...notify });
  await sendResendEmail({ to: req.email, ...confirm });
}
