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

export type TalkRequest = { name: string; email: string; message: string };

export function buildTalkNotificationEmail(req: TalkRequest): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Talk interest: ${req.name || req.email}`;
  const html = shell(`
    <h1 style="margin:0 0 20px 0;font-family:${SERIF};font-style:italic;font-weight:500;font-size:24px;color:#1a1a19;">New interest via /talk</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:${SANS};font-size:15px;color:#1a1a19;">
      <tr><td style="padding:6px 0;color:#737373;width:90px;">Name</td><td style="padding:6px 0;">${esc(req.name || "—")}</td></tr>
      <tr><td style="padding:6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(req.email)}" style="color:#08677b;">${esc(req.email)}</a></td></tr>
    </table>
    ${
      req.message
        ? `<div style="margin-top:20px;padding:16px 18px;background:#f7f7f6;border-radius:10px;font-family:${SANS};font-size:15px;line-height:1.6;color:#2c2c2b;white-space:pre-wrap;">${esc(req.message)}</div>`
        : ""
    }
    <p style="margin:24px 0 0 0;font-family:${SANS};font-size:14px;color:#5b5b5a;">Reply to this email to reach them directly.</p>
  `);
  const text = [
    `New /talk interest from ${req.name || "(no name)"} <${req.email}>`,
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
  const subject = "Thanks for your interest";
  const html = shell(`
    <h1 style="margin:0 0 18px 0;font-family:${SERIF};font-style:italic;font-weight:500;font-size:24px;color:#1a1a19;">${firstName ? `Thanks, ${esc(firstName)}.` : "Thanks for reaching out."}</h1>
    <p style="margin:0 0 14px 0;font-family:${SANS};font-size:16px;line-height:1.6;color:#2c2c2b;">There's been more interest in these conversations than I expected. I'm working through requests in the order they came in, and I'll reach out when I get to yours.</p>
    <p style="margin:0;font-family:${SANS};font-size:16px;line-height:1.6;color:#2c2c2b;">Thanks for your patience &mdash; and for wanting to talk it through in the first place.</p>
    <p style="margin:24px 0 0 0;font-family:${SERIF};font-style:italic;font-size:18px;color:#1a1a19;">&mdash; Jeremy</p>
  `);
  const text = [
    firstName ? `Thanks, ${req.name}.` : "Thanks for reaching out.",
    "",
    "There's been more interest in these conversations than I expected. I'm working through requests in the order they came in, and I'll reach out when I get to yours.",
    "",
    "Thanks for your patience — and for wanting to talk it through in the first place.",
    "",
    "— Jeremy",
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
