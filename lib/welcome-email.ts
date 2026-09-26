import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";

// Edit these to change the welcome email. Article slugs are looked up from
// your posts (Notion or local), so titles and descriptions stay in sync.
export const welcomeConfig = {
  subject: "Your copy of 7 Leadership Lessons (and where to start)",
  guidePath: "/downloads/7-leadership-lessons.pdf",
  articleSlugs: ["how-to-give-feedback"],
};

export type WelcomeArticle = { title: string; excerpt: string; path: string };

export async function getWelcomeArticles(): Promise<WelcomeArticle[]> {
  const found = await Promise.all(welcomeConfig.articleSlugs.map((slug) => getPost(slug)));
  return found.flatMap((post) =>
    post
      ? [
          {
            title: post.frontmatter.title,
            excerpt: post.frontmatter.excerpt,
            path: `/posts/${post.slug}`,
          },
        ]
      : []
  );
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export function buildWelcomeEmail({
  baseUrl,
  articles,
}: {
  baseUrl: string;
  articles: WelcomeArticle[];
}): { subject: string; html: string; text: string } {
  const guideUrl = `${baseUrl}${welcomeConfig.guidePath}`;
  const logoUrl = `${baseUrl}/logos/merlin-mark-transparent.png`;
  const unsubscribe = `mailto:${site.email}?subject=Unsubscribe`;
  const preheader =
    "Seven moments that changed how I lead, mostly through making mistakes. Your download is inside.";

  const articleBlocks = articles
    .map(
      (a) => `
              <tr>
                <td style="padding:0 0 22px 0;">
                  <a href="${baseUrl}${a.path}" style="font-family:${SERIF};font-style:italic;font-size:20px;line-height:1.3;color:#1a1a19;text-decoration:none;">${esc(a.title)}</a>
                  <div style="font-family:${SANS};font-size:15px;line-height:1.55;color:#5b5b5a;padding-top:6px;">${esc(a.excerpt)}</div>
                  <a href="${baseUrl}${a.path}" style="font-family:${SANS};font-size:14px;font-weight:600;color:#08677b;text-decoration:none;">Read the essay &rarr;</a>
                </td>
              </tr>`
    )
    .join("");

  const address = site.mailingAddress ? `<br>${esc(site.mailingAddress)}` : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(welcomeConfig.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f7f6;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f7f6;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #dcdcda;border-radius:14px;overflow:hidden;">

        <tr>
          <td style="background-color:#0e0e0d;padding:32px 40px 30px 40px;">
            <img src="${logoUrl}" width="150" alt="${esc(site.name)}" style="display:block;border:0;height:auto;width:150px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
              <tr>
                <td valign="middle" style="width:26px;"><div style="width:26px;height:1px;line-height:1px;font-size:1px;background-color:#ff914d;">&nbsp;</div></td>
                <td style="padding-left:12px;font-family:${SANS};font-size:12px;letter-spacing:2.4px;text-transform:uppercase;color:#ffab6e;">Welcome</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:40px 40px 8px 40px;">
            <h1 style="margin:0;font-family:${SERIF};font-style:italic;font-weight:500;font-size:32px;line-height:1.2;color:#1a1a19;">Thanks for joining. Your guide is ready.</h1>
            <p style="margin:22px 0 0 0;font-family:${SANS};font-size:17px;line-height:1.6;color:#1a1a19;">Hi, I&rsquo;m Jeremy. ${esc(site.name)} started as a folder of notes I kept re-sending to people. This is that folder, in public.</p>
            <p style="margin:16px 0 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:#5b5b5a;"><strong style="color:#1a1a19;">7 Leadership Lessons</strong> is seven moments that changed how I lead &mdash; mostly through making mistakes.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 40px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#0097b2" style="border-radius:10px;">
                  <a href="${guideUrl}" style="display:inline-block;padding:15px 30px;font-family:${SANS};font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">Download the PDF</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${
          articles.length
            ? `<tr>
          <td style="padding:0 40px;"><div style="height:1px;background-color:#dcdcda;line-height:1px;font-size:0;">&nbsp;</div></td>
        </tr>
        <tr>
          <td style="padding:32px 40px 10px 40px;">
            <div style="font-family:${SANS};font-size:12px;letter-spacing:2.4px;text-transform:uppercase;color:#ff914d;padding-bottom:20px;">Start here</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${articleBlocks}
            </table>
          </td>
        </tr>`
            : ""
        }

        <tr>
          <td style="padding:14px 40px 40px 40px;">
            <p style="margin:0;font-family:${SANS};font-size:16px;line-height:1.6;color:#5b5b5a;">If something in here is wrong, just hit reply and tell me. I&rsquo;d rather fix it than defend it.</p>
            <p style="margin:18px 0 0 0;font-family:${SERIF};font-style:italic;font-size:20px;color:#1a1a19;">&mdash; Jeremy</p>
          </td>
        </tr>

        <tr>
          <td style="background-color:#f7f7f6;border-top:1px solid #dcdcda;padding:24px 40px;">
            <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:#737373;">You&rsquo;re receiving this because you signed up at <a href="${site.url}" style="color:#737373;">${esc(site.url.replace(/^https?:\/\//, ""))}</a>. If you&rsquo;d rather not hear from me, <a href="${unsubscribe}" style="color:#737373;">unsubscribe here</a> or reply with &ldquo;unsubscribe&rdquo;.<br>${esc(site.name)}${address}</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    "Thanks for joining. Your guide is ready.",
    "",
    `Hi, I'm Jeremy. ${site.name} started as a folder of notes I kept re-sending to people. This is that folder, in public.`,
    "",
    "7 Leadership Lessons is seven moments that changed how I lead — mostly through making mistakes.",
    "",
    `Download the PDF: ${guideUrl}`,
    "",
    ...(articles.length
      ? [
          "START HERE",
          ...articles.flatMap((a) => [`- ${a.title}`, `  ${a.excerpt}`, `  ${baseUrl}${a.path}`, ""]),
        ]
      : []),
    "If something in here is wrong, just hit reply and tell me. I'd rather fix it than defend it.",
    "",
    "— Jeremy",
    "",
    "---",
    `You're receiving this because you signed up at ${site.url}. To unsubscribe, reply with "unsubscribe" or email ${site.email}.`,
  ].join("\n");

  return { subject: welcomeConfig.subject, html, text };
}

export async function sendWelcomeEmail(to: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[welcome-email] RESEND_API_KEY not set; skipping welcome email");
    return;
  }

  const { subject, html, text } = buildWelcomeEmail({
    baseUrl: site.url,
    articles: await getWelcomeArticles(),
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Jeremy Ross <${site.email}>`,
      to: [to],
      reply_to: site.email,
      subject,
      html,
      text,
      headers: {
        "List-Unsubscribe": `<mailto:${site.email}?subject=Unsubscribe>`,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}
