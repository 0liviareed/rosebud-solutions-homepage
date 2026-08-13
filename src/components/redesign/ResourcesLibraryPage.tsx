"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import BookDemoCTA from "./BookDemoCTA";
import { RESOURCES, STAGES, SECTORS, SORTS, KINDS, nameOf, type ResourceItem } from "./resourcesData";

// The Enquiry Library — resources index. Same design language as AboutV2
// (light lavender sections, Cormorant headings, DM Sans body) with a
// filterable/searchable card grid layered on top. Reachable only via the
// "Resources" nav/footer dropdown — see NAV_RESOURCES in capabilityData.ts.

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";

const eyebrow: CSSProperties = { fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 22, fontWeight: 600 };
const bodyText: CSSProperties = { fontSize: 17, lineHeight: 1.66, color: "rgba(23,19,31,0.66)" };
const label: CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(23,19,31,0.4)", margin: "0 0 11px" };

const CSS = `
.rb-lib-pad { padding-left: 48px; padding-right: 48px; }
.rb-lib-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }
.rb-lib-pill { display: inline-flex; align-items: center; border: 1px solid rgba(23,19,31,0.16); background: transparent; color: #585b78; border-radius: 20px; padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all .16s ease; }
.rb-lib-pill:hover { border-color: rgba(23,19,31,0.34); color: #17131F; }
.rb-lib-pill[aria-pressed="true"] { background: #17131F; border-color: #17131F; color: #fff; }
.rb-lib-pill .n { margin-left: 8px; font-size: 11px; font-weight: 700; opacity: .55; }
.rb-lib-card { display: flex; flex-direction: column; gap: 12px; background: #fff; border-radius: 18px; padding: 24px 24px 20px; color: inherit; text-decoration: none; box-shadow: 0 22px 44px -30px rgba(23,19,31,0.35); transition: transform .18s ease, box-shadow .18s ease; }
.rb-lib-card:hover { transform: translateY(-2px); box-shadow: 0 26px 50px -28px rgba(23,19,31,0.4); }
.rb-lib-arrow { width: 28px; height: 28px; border-radius: 50%; background: #17131F; color: #fff; display: grid; place-items: center; font-size: 13px; transition: transform .18s ease; }
.rb-lib-card:hover .rb-lib-arrow { transform: translateX(3px); }
@media (max-width: 900px){
  .rb-lib-pad { padding-left: 20px !important; padding-right: 20px !important; }
}
`;

export default function ResourcesLibraryPage() {
  const [sector, setSector] = useState("all");
  const [stage, setStage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sortIdx, setSortIdx] = useState(0);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [sortOpen]);

  const all = useMemo(() => Object.values(RESOURCES), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((i) => {
        if (stage && i.stage !== stage) return false;
        if (sector !== "all" && i.sector !== sector && i.sector !== "all") return false;
        if (q) {
          const hay = [i.title, i.dek, nameOf(STAGES, i.stage), nameOf(SECTORS, i.sector)].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort(SORTS[sortIdx].fn);
  }, [all, sector, stage, query, sortIdx]);

  const hasFilters = Boolean(stage || query || sector !== "all");
  const reset = () => { setStage(null); setSector("all"); setQuery(""); };

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#17131F", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <RedesignNav />
      <RedesignReveal />

      {/* ===================== HERO ===================== */}
      <section className="rb-lib-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", padding: "184px 48px 88px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.12) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div data-reveal style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto" }}>
          <div style={eyebrow}>Open library</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,6vw,64px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0, maxWidth: "20ch" }}>
            What happens to the enquiries <em style={{ fontStyle: "italic", color: A }}>nobody answers</em>
          </h1>
          <p style={{ ...bodyText, marginTop: 24, maxWidth: 560, fontSize: 15.5 }}>
            Guides, templates and research on capturing, qualifying, booking and keeping every enquiry your marketing pays for. Written for owners who run the intake themselves.
          </p>
        </div>
      </section>

      {/* ===================== FILTERS ===================== */}
      <section className="rb-lib-pad" style={{ background: "#F6F3FB", padding: "40px 48px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div>
            <p style={label}>Sector</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SECTORS.map((s) => (
                <button key={s.key} type="button" className="rb-lib-pill" aria-pressed={sector === s.key} onClick={() => setSector(s.key)}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 22 }}>
            <p style={label}>Stage</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {STAGES.map((s) => {
                const n = all.filter((i) => i.stage === s.key).length;
                return (
                  <button key={s.key} type="button" className="rb-lib-pill" aria-pressed={stage === s.key} onClick={() => setStage(stage === s.key ? null : s.key)}>
                    {s.name}<span className="n">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 26, paddingTop: 20, borderTop: "1px solid rgba(23,19,31,0.1)" }}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the library"
              aria-label="Search the library"
              style={{ flex: "1 1 300px", minWidth: 220, border: "1px solid rgba(23,19,31,0.14)", background: "#fff", borderRadius: 24, padding: "12px 18px", fontSize: 14, color: "#17131F", outline: "none", boxShadow: "0 10px 24px -18px rgba(23,19,31,0.5)" }}
            />
            <div ref={sortRef} style={{ position: "relative" }}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((v) => !v)}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid rgba(23,19,31,0.14)", borderRadius: 24, padding: "12px 18px", fontSize: 13.5, fontWeight: 600, color: "#3a3d5c", cursor: "pointer", boxShadow: "0 10px 24px -18px rgba(23,19,31,0.5)" }}
              >
                {SORTS[sortIdx].label}<span style={{ fontSize: 9, opacity: 0.5, transform: sortOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform .16s ease" }}>▼</span>
              </button>
              {sortOpen && (
                <div role="listbox" style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 20, minWidth: 180, background: "#fff", border: "1px solid rgba(23,19,31,0.1)", borderRadius: 16, padding: 6, boxShadow: "0 24px 48px -20px rgba(23,19,31,0.35)" }}>
                  {SORTS.map((s, i) => (
                    <button
                      key={s.key}
                      type="button"
                      role="option"
                      aria-selected={i === sortIdx}
                      onClick={() => { setSortIdx(i); setSortOpen(false); }}
                      style={{ display: "block", width: "100%", textAlign: "left", background: i === sortIdx ? "rgba(139,125,216,0.1)" : "transparent", color: i === sortIdx ? A : "#3a3d5c", border: 0, borderRadius: 10, padding: "10px 12px", fontSize: 13.5, fontWeight: i === sortIdx ? 600 : 500, cursor: "pointer" }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap", margin: "18px 0 0", fontSize: 13, color: "rgba(23,19,31,0.45)" }}>
            <span>Showing <b style={{ color: "#17131F", fontWeight: 700 }}>{filtered.length}</b> of <b style={{ color: "#17131F", fontWeight: 700 }}>{all.length}</b> resources</span>
            {hasFilters && (
              <button type="button" onClick={reset} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", color: A, fontWeight: 600, fontSize: 13 }}>
                Clear all filters
              </button>
            )}
          </p>
        </div>
      </section>

      {/* ===================== RESULTS ===================== */}
      <section className="rb-lib-pad" style={{ background: "#F6F3FB", padding: "30px 48px 140px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{ border: "1px dashed rgba(23,19,31,0.2)", borderRadius: 18, padding: "64px 28px", textAlign: "center" }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, color: "#17131F", margin: "0 0 10px" }}>Nothing matches that combination</h2>
              <p style={{ fontSize: 14.5, color: "rgba(23,19,31,0.55)", margin: "0 0 22px" }}>Try a broader sector, or clear your search.</p>
              <button type="button" onClick={reset} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#17131F", color: "#fff", fontSize: 13.5, fontWeight: 600, padding: "13px 24px", border: 0, borderRadius: 26, cursor: "pointer" }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="rb-lib-grid">
              {filtered.map((item) => (
                <ResourceCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== CLOSE ===================== */}
      <section className="rb-lib-pad" style={{ position: "relative", overflow: "hidden", background: "#080609", color: "#F5F1EA", padding: "150px 48px" }}>
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

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <a className="rb-lib-card" href={`/resources/${item.slug}`}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", fontSize: 10.5, fontWeight: 700, letterSpacing: "1.1px", textTransform: "uppercase", color: "rgba(23,19,31,0.4)" }}>
        <span style={{ color: A }}>{nameOf(STAGES, item.stage)}</span>
        <span aria-hidden style={{ opacity: 0.4 }}>/</span>
        <span>{nameOf(SECTORS, item.sector)}</span>
      </div>
      <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 20, lineHeight: 1.18, color: "#17131F", margin: 0 }}>{item.title}</h2>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(23,19,31,0.55)", margin: 0 }}>{item.dek}</p>
      <footer style={{ marginTop: "auto", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, fontWeight: 700, letterSpacing: ".9px", textTransform: "uppercase", color: "rgba(23,19,31,0.35)" }}>
        <span>{nameOf(KINDS, item.kind)} &middot; {item.mins} min read</span>
        <span className="rb-lib-arrow" aria-hidden>→</span>
      </footer>
    </a>
  );
}
