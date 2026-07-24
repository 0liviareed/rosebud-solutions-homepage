import type { CSSProperties, ReactNode } from "react";

/*
 * Industry-page stage scenes.
 *
 * Each stage in the new IndustryStagePage design has a square-ish illustrated
 * "scene" beside the copy. These are the code-drawn fallbacks ported verbatim
 * from the Dora mockups (Trades / Legal). They render until a supplied 2× PNG
 * is dropped in — set `img` on the scene ref in industryStageData and the page
 * swaps to `sceneImg(slug, file)` instead. Container-query units (cqw) scale
 * every element to the scene width; the parent carries `.rb-scene`
 * (container-type: inline-size), injected by IndustryStagePage.
 */

const NOISE =
  "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27140%27 height=%27140%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E')";

const GRAD: Record<SceneTone, { bg: string; ar: string; shadow: string; noise: number }> = {
  lilac: {
    bg: "radial-gradient(90% 70% at 78% 8%,#efeafb,transparent 60%),linear-gradient(150deg,#e6e3f5 0%,#d3d5ef 55%,#c6cbed 100%)",
    ar: "1 / 0.82",
    shadow: "0 30px 60px -28px rgba(60,66,120,.5)",
    noise: 0.13,
  },
  peach: {
    bg: "radial-gradient(100% 90% at 50% 0%,#f6ddc8,transparent 60%),linear-gradient(160deg,#f0d3bd,#eec4a8 58%,#eab791)",
    ar: "1 / 0.78",
    shadow: "0 30px 60px -30px rgba(120,80,50,.45)",
    noise: 0.24,
  },
};

export type SceneTone = "lilac" | "peach";

/** Supplied 2× PNG for a stage scene: /assets/industries/<slug>/<file> */
export function sceneImg(slug: string, file: string): ReactNode {
  return (
    <div style={{ width: "100%", borderRadius: 26, overflow: "hidden", boxShadow: "0 30px 60px -28px rgba(60,66,120,.5)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/assets/industries/${slug}/${file}`} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
    </div>
  );
}

function Stage({ tone, children }: { tone: SceneTone; children: ReactNode }) {
  const g = GRAD[tone];
  return (
    <div className="rb-scene" style={{ position: "relative", width: "100%", aspectRatio: g.ar, borderRadius: 26, overflow: "hidden", background: g.bg, boxShadow: g.shadow }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: NOISE, opacity: g.noise, mixBlendMode: "overlay", pointerEvents: "none" }} />
      {children}
    </div>
  );
}

// ── shared primitives ──────────────────────────────────────────────
const cardBase: CSSProperties = { position: "absolute", background: "#fff", zIndex: 3, overflow: "hidden" };

function Chip({ color, label, style }: { color: string; label: string; style: CSSProperties }) {
  return (
    <span style={{ position: "absolute", display: "inline-flex", alignItems: "center", gap: "1cqw", background: "#fff", borderRadius: "2cqw", padding: "1.1cqw 1.8cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(40,44,90,.45)", fontSize: "1.4cqw", fontWeight: 700, color: "#2c2f4a", zIndex: 3, ...style }}>
      <span style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: color, boxShadow: `0 0 0 .4cqw ${color}44` }} />
      {label}
    </span>
  );
}

function WhatsApp({ initials, when, them, us, usTime, style }: { initials: string; when: string; them: string; us: string; usTime: string; style: CSSProperties }) {
  return (
    <div style={{ ...cardBase, width: "58%", borderRadius: "2.8cqw", boxShadow: "0 2.6cqw 4.6cqw -1.8cqw rgba(40,44,90,.4)", ...style }}>
      <div style={{ background: "#1f9d63", color: "#fff", padding: "1.5cqw 2cqw", display: "flex", alignItems: "center", gap: "1.3cqw" }}>
        <span style={{ width: "3.4cqw", height: "3.4cqw", borderRadius: "50%", background: "rgba(255,255,255,.25)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: "1.6cqw" }}>{initials}</span>
        <div style={{ lineHeight: 1.15 }}><div style={{ fontWeight: 700, fontSize: "1.8cqw" }}>WhatsApp</div><div style={{ fontSize: "1.3cqw", opacity: 0.85 }}>{when}</div></div>
      </div>
      <div style={{ padding: "1.9cqw", background: "#eef4ef", display: "flex", flexDirection: "column", gap: "1.3cqw" }}>
        <div style={{ alignSelf: "flex-start", maxWidth: "86%", background: "#fff", borderRadius: "1.5cqw 1.5cqw 1.5cqw .3cqw", padding: "1.3cqw 1.6cqw", boxShadow: "0 .6cqw 1.2cqw -.6cqw rgba(0,0,0,.14)", fontSize: "1.75cqw", lineHeight: 1.35 }}>{them}<div style={{ textAlign: "right", fontSize: "1.15cqw", color: "#9aa0a8", marginTop: ".3cqw" }}>{usTime.split(" ")[0]}</div></div>
        <div style={{ alignSelf: "flex-end", maxWidth: "90%", background: "#d3efdd", borderRadius: "1.5cqw 1.5cqw .3cqw 1.5cqw", padding: "1.3cqw 1.6cqw", fontSize: "1.75cqw", lineHeight: 1.35 }}>{us}<div style={{ textAlign: "right", fontSize: "1.15cqw", color: "#3a8a5c", marginTop: ".3cqw" }}>{usTime} · auto ✓✓</div></div>
      </div>
    </div>
  );
}

function RowCard({ title, badge, rows, style, tone = "lilac" }: { title: string; badge?: ReactNode; rows: [string, string, string?][]; style: CSSProperties; tone?: SceneTone }) {
  const sh = tone === "peach" ? "0 3cqw 5cqw -1.8cqw rgba(120,80,50,.5)" : "0 3cqw 5cqw -1.6cqw rgba(40,44,90,.5)";
  return (
    <div style={{ ...cardBase, borderRadius: "2.6cqw", boxShadow: sh, padding: "2cqw 2.2cqw", ...style }}>
      <div style={{ fontSize: "1.25cqw", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#a7abc4", marginBottom: "1.2cqw" }}>{title}</div>
      {rows.map(([k, v, c], i) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "1.45cqw", fontWeight: 600, color: "#4a4d68", padding: ".9cqw 0", borderBottom: i < rows.length - 1 ? "1px solid #f2f3f7" : "none" }}>
          <span>{k}</span><span style={{ color: c ?? "#2c2f4a", fontWeight: 700 }}>{v}</span>
        </div>
      ))}
      {badge}
    </div>
  );
}

// ── Trades · 01 Win the job ────────────────────────────────────────
function tradesWinScene(): ReactNode {
  return (
    <Stage tone="lilac">
      <WhatsApp initials="GH" when="Tuesday · 07:02" them="Boiler’s dead — can someone come today?" us="An engineer has 9:30 this morning — shall I book him in?" usTime="07:03" style={{ left: "4%", top: "6%" }} />
      <div style={{ position: "absolute", right: "5%", top: "10%", display: "flex", flexDirection: "column", gap: "1.4cqw", zIndex: 3 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "1cqw", background: "#fff", borderRadius: "2cqw", padding: "1.1cqw 1.8cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(40,44,90,.45)", fontSize: "1.4cqw", fontWeight: 700, color: "#2c2f4a" }}><span style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#e8674f", boxShadow: "0 0 0 .4cqw rgba(232,103,79,.3)" }} />Urgency: Emergency</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "1cqw", background: "#fff", borderRadius: "2cqw", padding: "1.1cqw 1.8cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(40,44,90,.45)", fontSize: "1.4cqw", fontWeight: 700, color: "#2c2f4a" }}><span style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#e8b84f", boxShadow: "0 0 0 .4cqw rgba(232,184,79,.3)" }} />Access: home until 12</span>
      </div>
      <div style={{ ...cardBase, right: "5%", bottom: "8%", width: "54%", borderRadius: "2.6cqw", boxShadow: "0 3cqw 5cqw -1.6cqw rgba(40,44,90,.5)" }}>
        <div style={{ background: "#3f52b8", color: "#fff", padding: "1.5cqw 2cqw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: "1.8cqw" }}>Engineer diary</span><span style={{ fontSize: "1.3cqw", fontWeight: 600, opacity: 0.85 }}>Tue 09:30</span>
        </div>
        <div style={{ padding: "1.6cqw 2cqw", display: "flex", alignItems: "center", gap: "1.4cqw" }}>
          <span style={{ fontSize: "1.5cqw", fontWeight: 700, color: "#5877e8" }}>09:30</span>
          <span style={{ flex: 1, background: "linear-gradient(#eef1fb,#e5eafb)", borderLeft: ".6cqw solid #5877e8", borderRadius: "1cqw", padding: "1.1cqw 1.4cqw" }}>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, fontSize: "1.6cqw", color: "#2c2f4a" }}>Boiler breakdown</span><span style={{ fontSize: "1.1cqw", fontWeight: 700, color: "#2f7a4f", background: "#d3efdd", padding: ".35cqw 1cqw", borderRadius: "1cqw" }}>Booked ✓</span></span>
            <span style={{ display: "block", fontSize: "1.25cqw", color: "#787b95", marginTop: ".4cqw" }}>Gas-safe · 90 min · SE12</span>
          </span>
        </div>
      </div>
      <Chip color="#4fd18a" label="Replied in 41s" style={{ left: "4%", bottom: "9%" }} />
    </Stage>
  );
}

// ── Trades · 03 Get paid & repeat ──────────────────────────────────
function tradesPaidScene(): ReactNode {
  return (
    <Stage tone="peach">
      <div style={{ ...cardBase, left: "5%", top: "7%", width: "56%", borderRadius: "2.6cqw", boxShadow: "0 3cqw 5cqw -1.8cqw rgba(120,80,50,.5)" }}>
        <div style={{ padding: "2cqw 2.2cqw 1.4cqw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: "1.8cqw", color: "#2c2f4a" }}>Invoice #1284</span>
          <span style={{ fontSize: "1.2cqw", fontWeight: 700, color: "#2f7a4f", background: "#d3efdd", padding: ".5cqw 1.3cqw", borderRadius: "1.2cqw" }}>Paid ✓</span>
        </div>
        <div style={{ padding: "0 2.2cqw 1.8cqw" }}>
          {[["Boiler replacement", "£2,340", "#4a4d68"], ["Sent automatically", "Tue 17:04", "#8a8ea6"], ["Reminder · day 3", "Fri 09:00", "#8a8ea6"]].map(([k, v, c]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "1.45cqw", fontWeight: 600, color: "#4a4d68", padding: "1cqw 0", borderTop: "1px solid #f2f3f7" }}><span>{k}</span><span style={{ color: c }}>{v}</span></div>
          ))}
        </div>
      </div>
      <Chip color="#4fd18a" label="Paid in 4 days" style={{ right: "5%", top: "13%" }} />
      <RowCard tone="peach" title="Follow-up queue" style={{ right: "4%", bottom: "8%", width: "52%" }} rows={[]} badge={
        <>
          {[["#b6dd3f", "3-month check-in", "Sep"], ["#e8b84f", "Annual boiler service", "Jul ’27"], ["#4fc3d1", "Referral nudge", "Queued"]].map(([dot, label, when], i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: ".9cqw 0", borderBottom: i < 2 ? "1px solid #f2f3f7" : "none" }}>
              <span style={{ width: "1.7cqw", height: "1.7cqw", borderRadius: "50%", background: dot, boxShadow: `0 0 0 .4cqw ${dot}55` }} />
              <span style={{ flex: 1, fontSize: "1.45cqw", fontWeight: 600, color: "#2c2f4a" }}>{label}</span>
              <span style={{ fontSize: "1.25cqw", fontWeight: 700, color: "#8a8ea6" }}>{when}</span>
            </div>
          ))}
        </>
      } />
    </Stage>
  );
}

// ── Legal · 01 Answer & capture ────────────────────────────────────
function legalIntakeScene(): ReactNode {
  return (
    <Stage tone="lilac">
      <WhatsApp initials="RK" when="Sunday · 20:12" them="I need to speak to someone about a custody arrangement." us="We can help. A few questions so the right attorney reviews your matter — which county is the case in?" usTime="20:12" style={{ left: "4%", top: "6%" }} />
      <div style={{ position: "absolute", right: "5%", top: "9%", display: "flex", flexDirection: "column", gap: "1.4cqw", zIndex: 3 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "1cqw", background: "#fff", borderRadius: "2cqw", padding: "1.1cqw 1.8cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(40,44,90,.45)", fontSize: "1.4cqw", fontWeight: 700, color: "#2c2f4a" }}><span style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#4fc3d1", boxShadow: "0 0 0 .4cqw rgba(79,195,209,.3)" }} />Matter: Custody</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "1cqw", background: "#fff", borderRadius: "2cqw", padding: "1.1cqw 1.8cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(40,44,90,.45)", fontSize: "1.4cqw", fontWeight: 700, color: "#2c2f4a" }}><span style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#e8b84f", boxShadow: "0 0 0 .4cqw rgba(232,184,79,.3)" }} />Jurisdiction: Kent Co.</span>
      </div>
      <RowCard title="Conflict-check inputs" style={{ right: "5%", bottom: "8%", width: "54%" }} rows={[["Opposing party", "Captured ✓"], ["Matter type", "Family / custody"], ["Review", "Your firm runs it", "#c07a3f"]]} />
      <Chip color="#4fd18a" label="Answered in 38s · day or night" style={{ left: "4%", bottom: "9%" }} />
    </Stage>
  );
}

// ── Legal · 03 System of record ────────────────────────────────────
function legalRecordScene(): ReactNode {
  return (
    <Stage tone="peach">
      <div style={{ ...cardBase, left: "5%", top: "7%", width: "56%", borderRadius: "2.6cqw", boxShadow: "0 3cqw 5cqw -1.8cqw rgba(120,80,50,.5)" }}>
        <div style={{ padding: "2cqw 2.2cqw 1.4cqw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: "1.8cqw", color: "#2c2f4a" }}>New matter record</span>
          <span style={{ fontSize: "1.2cqw", fontWeight: 700, color: "#2f7a4f", background: "#d3efdd", padding: ".5cqw 1.3cqw", borderRadius: "1.2cqw" }}>Complete ✓</span>
        </div>
        <div style={{ padding: "0 2.2cqw 1.8cqw" }}>
          {[["Contact", "R. Keating", "#4a4d68"], ["Matter", "Family / custody", "#4a4d68"], ["Conflict inputs", "Attached", "#8a8ea6"], ["Consult", "Wed 11:00 · booked", "#4a4d68"]].map(([k, v, c]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "1.45cqw", fontWeight: 600, color: "#4a4d68", padding: "1cqw 0", borderTop: "1px solid #f2f3f7" }}><span>{k}</span><span style={{ color: c }}>{v}</span></div>
          ))}
        </div>
      </div>
      <Chip color="#4fd18a" label="Written into Clio" style={{ right: "5%", top: "13%" }} />
      <div style={{ ...cardBase, right: "4%", bottom: "8%", width: "52%", borderRadius: "2.6cqw", boxShadow: "0 3cqw 5cqw -1.8cqw rgba(120,80,50,.5)", padding: "2cqw 2.2cqw" }}>
        <div style={{ fontSize: "1.25cqw", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#a7abc4", marginBottom: "1.2cqw" }}>Syncs with</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1cqw" }}>
          {["Clio", "MyCase", "PracticePanther", "Smokeball", "CosmoLex", "Filevine"].map((s) => (
            <span key={s} style={{ background: "#eef1fb", color: "#3a3d5c", fontSize: "1.35cqw", fontWeight: 700, padding: ".8cqw 1.6cqw", borderRadius: "1.4cqw" }}>{s}</span>
          ))}
        </div>
      </div>
    </Stage>
  );
}

const SCENES: Record<string, () => ReactNode> = {
  "trades-win": tradesWinScene,
  "trades-paid": tradesPaidScene,
  "legal-intake": legalIntakeScene,
  "legal-record": legalRecordScene,
};

/** Render a stage scene by id (code-drawn fallback). */
export function industryScene(id: string): ReactNode {
  return (SCENES[id] ?? tradesWinScene)();
}
