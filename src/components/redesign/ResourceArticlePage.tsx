"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import BookDemoCTA from "./BookDemoCTA";
import { STAGES, SECTORS, nameOf, type ResourceItem } from "./resourcesData";

// /resources/[slug] article template. Same design language as AboutV2 —
// narrowed to a readable column for long-form body copy. Supports a richer
// block set than the first article needed (TOC, subheadings, lists, a
// formula callout, an inline FAQ accordion + FAQPage schema, related links,
// and a real gated-download capture form).

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

// Minimal **bold** / [text](url) inline parser — keeps authoring in
// resourcesData.ts close to the source markdown instead of needing a
// rich-text schema. Internal links (starting with "#" or "/") stay in-tab;
// external links open in a new tab with rel=noopener.
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: "#17131F", fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const internal = href.startsWith("#") || href.startsWith("/");
      return (
        <a
          key={i}
          href={href}
          {...(!internal && { target: "_blank", rel: "noopener noreferrer" })}
          style={{ color: A, textDecoration: "underline", textUnderlineOffset: 2 }}
        >
          {label}
        </a>
      );
    }
    return part ? <span key={i}>{part}</span> : null;
  });
}

function ArticleFaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderTop: "1px solid rgba(23,19,31,0.1)" }}>
      <button type="button" onClick={onToggle} aria-expanded={open} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 2px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "#17131F", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(17px,1.7vw,20px)", lineHeight: 1.3 }}>
        <span>{q}</span>
        <span aria-hidden style={{ flex: "none", width: 28, height: 28, borderRadius: 999, border: "1px solid rgba(23,19,31,0.16)", display: "grid", placeItems: "center", fontSize: 14, color: "rgba(23,19,31,0.5)", transform: open ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 320 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ margin: "0 0 22px", maxWidth: "72ch", fontSize: 15, lineHeight: 1.64, color: "rgba(23,19,31,0.66)" }}>{a}</p>
      </div>
    </div>
  );
}

function DownloadCta({ heading, body, buttonLabel, resourceKey, sourceSlug }: { heading: string; body: string; buttonLabel: string; resourceKey: string; sourceSlug: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const r = await fetch("/api/resources/bid-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, company, email, resourceKey, sourceSlug }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setStatus("error"); setError(j.error || "Something went wrong. Please try again."); return; }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ background: "#F1EDE6", borderRadius: 20, padding: "38px 40px 36px", margin: "8px 0" }}>
      <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(26px,3.2vw,32px)", lineHeight: 1.14, color: "#17131F", margin: "0 0 16px" }}>{heading}</h2>
      <p style={{ margin: "0 0 26px", fontSize: 15.5, lineHeight: 1.7, color: "rgba(23,19,31,0.6)" }}>{body}</p>
      {status === "done" ? (
        <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: A }}>Sent — check your inbox for the download links.</p>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              aria-label="First name"
              style={{ flex: "1 1 160px", border: "1px solid rgba(23,19,31,0.16)", background: "#fff", borderRadius: 24, padding: "13px 18px", fontSize: 14, color: "#17131F", outline: "none" }}
            />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              aria-label="Last name"
              style={{ flex: "1 1 160px", border: "1px solid rgba(23,19,31,0.16)", background: "#fff", borderRadius: 24, padding: "13px 18px", fontSize: 14, color: "#17131F", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              aria-label="Company"
              style={{ flex: "1 1 200px", border: "1px solid rgba(23,19,31,0.16)", background: "#fff", borderRadius: 24, padding: "13px 18px", fontSize: 14, color: "#17131F", outline: "none" }}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              style={{ flex: "1 1 200px", border: "1px solid rgba(23,19,31,0.16)", background: "#fff", borderRadius: 24, padding: "13px 18px", fontSize: 14, color: "#17131F", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
            <button type="submit" disabled={status === "loading"} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#17131F", color: "#fff", fontSize: 13.5, fontWeight: 600, padding: "14px 26px", border: 0, borderRadius: 26, cursor: status === "loading" ? "default" : "pointer", opacity: status === "loading" ? 0.6 : 1, whiteSpace: "nowrap" }}>
              {status === "loading" ? "Sending…" : buttonLabel} {status !== "loading" && <span aria-hidden>→</span>}
            </button>
            <span style={{ fontSize: 13.5, color: "rgba(23,19,31,0.5)" }}>Free, both files, no card.</span>
          </div>
        </form>
      )}
      {status === "error" && <p style={{ margin: "12px 0 0", fontSize: 13.5, color: "#B15A28" }}>{error}</p>}
    </div>
  );
}

export default function ResourceArticlePage({ data }: { data: ResourceItem }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#17131F", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <RedesignNav />
      <RedesignReveal />

      {/* ===================== HERO ===================== */}
      <section className="rb-art-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", padding: "184px 48px 80px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.12) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div data-reveal style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <a href="/resources" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.5)", textDecoration: "none", marginBottom: 28 }}>
            <span aria-hidden>←</span> Back to the library
          </a>
          <div style={eyebrow}>{nameOf(STAGES, data.stage)} · {nameOf(SECTORS, data.sector)}</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px,4.6vw,50px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: 0 }}>
            {data.title}
          </h1>
          <p style={{ ...bodyText, marginTop: 24, fontSize: 18 }}>{data.dek}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginTop: 28, fontSize: 13, color: "rgba(23,19,31,0.5)" }}>
            {data.author && (
              <>
                <span><b style={{ color: "#17131F" }}>{data.author.name}</b> · {data.author.role}</span>
                <span aria-hidden style={{ opacity: 0.4 }}>/</span>
              </>
            )}
            <span>{formatDate(data.date)}</span>
            <span aria-hidden style={{ opacity: 0.4 }}>/</span>
            <span>{data.mins} min read</span>
          </div>
        </div>
      </section>

      {/* ===================== TOC ===================== */}
      {data.toc && data.toc.length > 0 && (
        <section className="rb-art-pad" style={{ background: "#F6F3FB", padding: "44px 48px 0" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(23,19,31,0.4)", paddingBottom: 14, borderBottom: "1px solid rgba(23,19,31,0.14)" }}>On this page</div>
            <ol style={{ listStyle: "none", margin: 0, padding: "12px 0 0", display: "flex", flexDirection: "column", gap: 2 }}>
              {data.toc.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} style={{ display: "flex", gap: 14, padding: "7px 0", fontSize: 15, lineHeight: 1.45, color: "rgba(23,19,31,0.68)", textDecoration: "none" }}>
                    <span aria-hidden style={{ flex: "none", width: 22, fontSize: 13, color: "rgba(23,19,31,0.32)", fontWeight: 600 }}>{i + 1}.</span>
                    <span>{c.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ===================== BODY =====================
          No data-reveal here on purpose: it's a scroll-triggered fade meant
          for short, viewport-sized sections (see every other page's usage).
          Wrapping an entire long-form article body in one — this one runs
          8000px+ tall — meant the intersection observer never considered it
          "in view" enough to fire, leaving the whole article stuck invisible
          at opacity:0. Confirmed live 2026-08-13. */}
      <section className="rb-art-pad" style={{ background: "#F6F3FB", padding: "56px 48px 120px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
          {data.body.map((block, i) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2 key={i} id={block.id} style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px,2.6vw,32px)", lineHeight: 1.16, letterSpacing: "-0.01em", margin: "18px 0 0", scrollMarginTop: 24 }}>
                    {block.text}
                  </h2>
                );
              case "h3":
                return (
                  <h3 key={i} style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(23,19,31,0.45)", margin: "10px 0 0" }}>
                    {block.text}
                  </h3>
                );
              case "p":
                return <p key={i} style={bodyText}>{renderInline(block.text)}</p>;
              case "list":
                return (
                  <ol key={i} style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid rgba(23,19,31,0.1)", paddingTop: 18 }}>
                    {block.items.map((it, j) => (
                      <li key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        {block.ordered ? (
                          <span aria-hidden style={{ flex: "none", width: 24, height: 24, borderRadius: 999, background: "rgba(139,125,216,0.16)", color: A, fontSize: 12, fontWeight: 700, display: "grid", placeItems: "center", marginTop: 3 }}>{j + 1}</span>
                        ) : (
                          <span aria-hidden style={{ flex: "none", width: 6, height: 6, borderRadius: 999, background: A, marginTop: 10 }} />
                        )}
                        {/* explicit text-node space: CSS gap separates the badge
                            visually but adds nothing to textContent, so crawlers/
                            screen readers reading plain text saw "1Get a Unique
                            Entity ID..." with no separator. Confirmed 2026-08-13. */}
                        {" "}
                        <span style={bodyText}>
                          {it.lead && <strong style={{ color: "#17131F", fontWeight: 700 }}>{renderInline(it.lead)} </strong>}
                          {renderInline(it.text)}
                        </span>
                      </li>
                    ))}
                  </ol>
                );
              case "callout":
                return (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px 26px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 24px 60px -44px rgba(23,19,31,0.35)" }}>
                    {block.lines.map((l, j) => (
                      <div key={j}>
                        {j > 0 && <div style={{ height: 1, background: "rgba(23,19,31,0.1)", margin: "0 0 12px" }} />}
                        <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, lineHeight: 1.6, color: "#17131F" }}>{l}</div>
                      </div>
                    ))}
                  </div>
                );
              case "quote":
                return (
                  <div key={i} style={{ borderLeft: `2px solid ${A}`, paddingLeft: 24 }}>
                    <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.68, color: "rgba(23,19,31,0.62)" }}>{block.text}</p>
                  </div>
                );
              case "table":
                return (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "8px 26px", boxShadow: "0 24px 60px -44px rgba(23,19,31,0.35)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: `minmax(0,1fr) repeat(${block.head.length - 1}, auto)`, gap: 16, padding: "14px 2px", borderBottom: "1px solid rgba(23,19,31,0.16)" }}>
                      {block.head.map((h, j) => (
                        <span key={j} style={{ textAlign: j === 0 ? "left" : "right", fontSize: 10.5, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(23,19,31,0.4)" }}>{h}</span>
                      ))}
                    </div>
                    {block.rows.map((row, j) => (
                      <div key={j} style={{ display: "grid", gridTemplateColumns: `minmax(0,1fr) repeat(${block.head.length - 1}, auto)`, gap: 16, padding: "13px 2px", borderBottom: "1px solid rgba(23,19,31,0.08)", fontSize: 14.5 }}>
                        {row.map((v, k) => (
                          <span key={k} style={{ textAlign: k === 0 ? "left" : "right", color: k === 0 ? "#4a4d68" : "#17131F", fontWeight: k === 0 ? 500 : 700, fontVariantNumeric: "tabular-nums" }}>{v}</span>
                        ))}
                      </div>
                    ))}
                    {block.totalRow && (
                      <div style={{ display: "grid", gridTemplateColumns: `minmax(0,1fr) repeat(${block.head.length - 1}, auto)`, gap: 16, padding: "13px 2px", fontSize: 14.5 }}>
                        {block.totalRow.map((v, k) => (
                          <span key={k} style={{ textAlign: k === 0 ? "left" : "right", color: "#17131F", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{v}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              case "bar-chart": {
                const max = Math.max(...block.bars.map((b) => b.value));
                return (
                  <figure key={i} style={{ margin: 0, background: "#fff", borderRadius: 16, padding: "24px 26px 20px", boxShadow: "0 24px 60px -44px rgba(23,19,31,0.35)" }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#17131F", marginBottom: 20 }}>{block.title}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                      {block.bars.map((b, j) => {
                        const pct = Math.max(1.5, (b.value / max) * 100);
                        const fill = b.muted ? "rgba(139,125,216,0.35)" : b.lead ? A : "rgba(139,125,216,0.7)";
                        return (
                          <div key={j} style={{ display: "grid", gridTemplateColumns: "150px minmax(0,1fr) 54px", gap: 14, alignItems: "center" }}>
                            <span style={{ fontSize: 12.5, color: b.lead ? "#17131F" : "rgba(23,19,31,0.55)", fontWeight: b.lead ? 700 : 500, textAlign: "right" }}>{b.label}</span>
                            <span style={{ display: "block", height: 18, background: "rgba(23,19,31,0.06)", borderRadius: 3, overflow: "hidden" }}>
                              <span style={{ display: "block", height: "100%", width: `${pct}%`, background: fill, borderRadius: 3 }} />
                            </span>
                            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#17131F", fontVariantNumeric: "tabular-nums" }}>{block.unit === "%" ? `${b.value}%` : b.value}</span>
                          </div>
                        );
                      })}
                    </div>
                    <figcaption style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(23,19,31,0.1)", fontSize: 12, lineHeight: 1.55, color: "rgba(23,19,31,0.45)" }}>{block.caption}</figcaption>
                  </figure>
                );
              }
              case "stat-row":
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
              case "cta-download":
                return <DownloadCta key={i} heading={block.heading} body={block.body} buttonLabel={block.buttonLabel} resourceKey={block.resourceKey} sourceSlug={data.slug} />;
              case "faq":
                return (
                  <div key={i} style={{ marginTop: 20 }}>
                    <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px,2.6vw,32px)", lineHeight: 1.16, letterSpacing: "-0.01em", margin: "0 0 18px" }}>Frequently asked questions</h2>
                    <div>
                      {block.items.map((f, j) => (
                        <ArticleFaqItem key={f.q} q={f.q} a={f.a} open={faqOpen === j} onToggle={() => setFaqOpen((o) => (o === j ? null : j))} />
                      ))}
                    </div>
                  </div>
                );
              case "related":
                return (
                  <div key={i} style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(23,19,31,0.4)", marginBottom: 14 }}>Related</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {block.items.map((r) => (
                        <a key={r.href} href={r.href} style={{ display: "flex", gap: 12, padding: "10px 0", fontSize: 15.5, lineHeight: 1.5, borderBottom: "1px solid rgba(23,19,31,0.1)", color: "#17131F", textDecoration: "none" }}>
                          {r.title} {r.desc && <span style={{ color: "rgba(23,19,31,0.42)" }}>— {r.desc}</span>}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              default:
                return null;
            }
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
