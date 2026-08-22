import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { RESOURCES } from "@/components/redesign/resourcesData";

// Per-resource OG/Twitter image — used whenever a RESOURCES entry doesn't set
// its own `ogImage`. Embeds the article's own diagram (via `ogDiagram`) next
// to the title/dek when it has one, rather than falling back to the generic
// sitewide brand card (app/opengraph-image.tsx) — the actual chart is what
// does the work on a LinkedIn share.

export function generateStaticParams() {
  return Object.keys(RESOURCES).map((slug) => ({ slug }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = RESOURCES[slug];
  const logoData = readFileSync(join(process.cwd(), "public/rosebud-logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  let diagramSrc: string | null = null;
  if (data?.ogDiagram) {
    try {
      const diagramData = readFileSync(join(process.cwd(), "public", data.ogDiagram));
      const mime = data.ogDiagram.endsWith(".svg") ? "image/svg+xml" : "image/png";
      diagramSrc = `data:${mime};base64,${diagramData.toString("base64")}`;
    } catch {
      diagramSrc = null;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0C0B10",
          backgroundImage:
            "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.28) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.14) 0%, transparent 55%)",
          padding: "56px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={52} height={52} style={{ borderRadius: 12 }} />
          <div style={{ fontSize: 26, fontWeight: 500, color: "#F5F1EA" }}>Rosebud Solutions</div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ flex: diagramSrc ? "0 0 46%" : 1, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: data ? 46 : 56, fontWeight: 500, color: "#F5F1EA", lineHeight: 1.15 }}>
              {data?.title ?? "Rosebud Solutions"}
            </div>
            {data?.dek && (
              <div style={{ marginTop: 22, fontSize: 22, color: "rgba(245,241,234,0.62)", lineHeight: 1.42 }}>
                {data.dek.length > 150 ? `${data.dek.slice(0, 150)}…` : data.dek}
              </div>
            )}
          </div>
          {diagramSrc && (
            <div style={{ flex: "0 0 44%", display: "flex", background: "#fff", borderRadius: 16, padding: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={diagramSrc} width={452} height={211} style={{ objectFit: "contain" }} />
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
