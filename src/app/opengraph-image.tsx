import { ImageResponse } from "next/og";
import { readPublicAsset } from "@/lib/publicAsset";

// Sitewide default OG/Twitter image (Next.js file convention — auto-wires
// og:image + twitter:image on every page that doesn't define its own).
// Confirmed missing sitewide via Ahrefs audit 2026-08-17: every page had
// og:title/description/url but no image, so shares rendered as text-only
// link cards everywhere.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readPublicAsset("rosebud-logo.png");
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
        <img src={logoSrc} width={84} height={84} style={{ borderRadius: 18 }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 56,
            fontWeight: 500,
            color: "#F5F1EA",
            letterSpacing: "-0.01em",
          }}
        >
          Rosebud Solutions
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 27,
            color: "rgba(245,241,234,0.62)",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          Customer Communication Platform for SMEs
        </div>
      </div>
    ),
    { ...size }
  );
}
