import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Dedicated OG/Twitter image for the /resources index. Previously this page
// set `openGraph` explicitly without an `images` field, which suppresses
// Next's file-convention default (app/opengraph-image.tsx) rather than
// falling back to it — the share card had no image at all, not just a
// generic one. Matches the branded-card style used by the per-resource
// dynamic OG route.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), "public/rosebud-logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0C0B10",
          backgroundImage:
            "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.28) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.14) 0%, transparent 55%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={64} height={64} style={{ borderRadius: 14 }} />
        <div style={{ marginTop: 32, fontSize: 58, fontWeight: 500, color: "#F5F1EA", letterSpacing: "-0.01em" }}>
          The Inquiry Library
        </div>
        <div style={{ marginTop: 20, fontSize: 25, color: "rgba(245,241,234,0.62)", maxWidth: 840, textAlign: "center", lineHeight: 1.4 }}>
          Guides, templates and research on capturing, qualifying, booking and keeping every inquiry your marketing pays for.
        </div>
      </div>
    ),
    { ...size }
  );
}
