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
          justifyContent: "center",
          gap: 56,
          background: "#ffffff",
          padding: "80px 96px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={264} height={100} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            whiteSpace: "nowrap",
            fontStyle: "italic",
            color: "#1a1a1a",
            lineHeight: 1.12,
          }}
        >
          <span>Deliver results today.</span>
          <span>Build the leaders for tomorrow.</span>
        </div>
      </div>
    ),
    size
  );
}
