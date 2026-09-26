import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 32,
          background: "#0e0e0d",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 26, height: 2, background: "#ff914d", display: "flex" }} />
          <div
            style={{
              display: "flex",
              color: "#ffab6e",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Leadership Collective
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 58, fontStyle: "italic", color: "#fff", lineHeight: 1.15 }}>
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    size
  );
}
