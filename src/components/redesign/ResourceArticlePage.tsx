"use client";

import type { CSSProperties } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import BookDemoCTA from "./BookDemoCTA";
import { STAGES, SECTORS, nameOf, type ResourceItem } from "./resourcesData";

// /resources/[slug] article template. Same design language as AboutV2 —
// narrowed to a readable column for long-form body copy.

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";

const eyebrow: CSSProperties = { fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 22, fontWeight: 600 };
const bodyText: CSSProperties = { fontSize: 17, lineHeight: 1.72, color: "rgba(23,19,31,0.7)" };

const CSS = `
.rb-art-pad { padding-left: 48px; padding-right: 48px; }
@media (max-width: 900px){ .rb-art-pad { padding-left: 20px !important; padding-right: 20px !important; } }
`;

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function ResourceArticlePage({ data }: { data: ResourceItem }) {
  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#17131F", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <RedesignNav />
      <RedesignReveal />

      {/* ===================== HERO ===================== */}
      <section className="rb-art-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", padding: "184px 48px 96px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.12) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div data-reveal style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <a href="/resources" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.5)", textDecoration: "none", marginBottom: 28 }}>
            <span aria-hidden>←</span> Back to the library
          </a>
          <div style={eyebrow}>Research</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px,5vw,54px)", lineHeight: 1.08, letterSpacing: "-0.015em", margin: 0 }}>
            {data.title}
          </h1>
          <p style={{ ...bodyText, marginTop: 24, fontSize: 18 }}>{data.dek}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginTop: 28, fontSize: 12.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(23,19,31,0.4)" }}>
            <span>{formatDate(data.date)}</span>
            <span aria-hidden style={{ opacity: 0.4 }}>/</span>
            <span>{data.mins} min read</span>
            <span aria-hidden style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: A }}>{nameOf(STAGES, data.stage)}</span>
            <span aria-hidden style={{ opacity: 0.4 }}>/</span>
            <span>{nameOf(SECTORS, data.sector)}</span>
          </div>
        </div>
      </section>

      {/* ===================== BODY ===================== */}
      <section className="rb-art-pad" style={{ background: "#F6F3FB", padding: "96px 48px 120px" }}>
        <div data-reveal style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 26 }}>
          {data.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px,2.6vw,32px)", lineHeight: 1.16, letterSpacing: "-0.01em", margin: "18px 0 0" }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "stat-row") {
              return (
                <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: 16, margin: "8px 0" }}>
                  {block.stats.map((s, j) => (
                    <div key={j} style={{ flex: "1 1 160px", background: "#fff", border: "1px solid rgba(23,19,31,0.08)", borderRadius: 18, padding: "22px 22px 20px", boxShadow: "0 24px 60px -44px rgba(23,19,31,0.35)" }}>
                      <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 34, color: A, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 12.5, color: "rgba(23,19,31,0.55)", marginTop: 8 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              );
            }
            return <p key={i} style={bodyText}>{block.text}</p>;
          })}
        </div>
      </section>

      {/* ===================== CLOSE ===================== */}
      <section className="rb-art-pad" style={{ position: "relative", overflow: "hidden", background: "#080609", color: "#F5F1EA", padding: "150px 48px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/topo.jpg" alt="" style={{ position: "absolute", inset: "-4%", width: "108%", height: "108%", objectFit: "cover", filter: "brightness(0.4) saturate(0.85)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 40%, rgba(8,6,10,0.55) 0%, rgba(8,6,10,0.82) 65%, #080609 100%)" }} />
        </div>
        <div data-reveal data-reveal-repeat style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: ".32em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 22 }}>The offer</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.8vw,68px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0 }}>Ready to stop losing enquiries?</h2>
          <p style={{ margin: "24px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.62, color: "rgba(245,241,234,0.66)" }}>We deploy, manage, and monitor the entire intake layer for you as an operated rental service, connecting directly to your existing CRM and calendars.</p>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <BookDemoCTA label="See pricing & choose your plan" href="/pricing" tone="dark" />
            <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 999, border: "1px solid rgba(245,241,234,0.22)", color: "#F5F1EA", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Book a consultation</a>
          </div>
        </div>
      </section>

      <RedesignFooter />
    </div>
  );
}
