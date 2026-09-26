import { getAllPosts } from "@/lib/posts";
import { site, absoluteUrl } from "@/lib/site";

export const revalidate = 300;

function escape(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = (await getAllPosts()).filter((p) => !p.frontmatter.draft);
  const updated = posts[0]
    ? new Date(posts[0].frontmatter.date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/posts/${post.slug}`);
      return `    <item>
      <title>${escape(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escape(post.frontmatter.excerpt)}</description>
      ${(post.frontmatter.tags ?? [])
        .map((t) => `<category>${escape(t)}</category>`)
        .join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${site.url}</link>
    <description>${escape(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
