import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.frontmatter.title ?? site.name;
  const tags = post?.frontmatter.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0e0d",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 26, height: 2, background: "#ff914d", display: "flex" }} />
          <div
            style={{
              color: "#ffab6e",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 54 : 64,
            fontStyle: "italic",
            color: "#ffffff",
            lineHeight: 1.15,
            fontWeight: 500,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "rgba(255,255,255,0.5)",
            fontSize: 22,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <span style={{ display: "flex", width: 32, height: 3, background: "#0097b2" }} />
          {tags.length > 0 ? tags.slice(0, 3).join("  ·  ") : site.tagline}
        </div>
      </div>
    ),
    size
  );
}
