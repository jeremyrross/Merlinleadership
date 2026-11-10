import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} | ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/logos/merlin-mark-transparent.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={264} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 26, height: 2, background: "#ff914d", display: "flex" }} />
            <div
              style={{
                display: "flex",
                color: "#ffab6e",
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontFamily: "Helvetica, Arial, sans-serif",
              }}
            >
              Leadership · Innovation · Growth
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontStyle: "italic",
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            <span>Deliver results today.</span>
            <span>Build the leaders for tomorrow.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.55)",
            fontSize: 22,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <span>{site.name}</span>
          <span>merlinleadership.com</span>
        </div>
      </div>
    ),
    size
  );
}
