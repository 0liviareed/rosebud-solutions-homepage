"use client";
import { useEffect, useState } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import BookDemoCTA from "./BookDemoCTA";
import { INDUSTRY_LINKS, DEMO } from "./industryData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";

// ── Catalogue ─────────────────────────────────────────────────────────
// Matches the existing homepage integrations marquee. Category + description
// per system; favicon logo with a lettermark fallback (same as the mockup).
const DOMAINS: Record<string, string> = {
  HubSpot: "hubspot.com", Pipedrive: "pipedrive.com", Zoho: "zoho.com", Close: "close.com",
  Capsule: "capsulecrm.com", Copper: "copper.com", Salesforce: "salesforce.com",
  "Microsoft Dynamics 365": "dynamics.microsoft.com", "Google Calendar": "calendar.google.com",
  Outlook: "outlook.live.com", "Cal.com": "cal.com", Calendly: "calendly.com",
  "WhatsApp Business": "whatsapp.com", Clio: "clio.com", ServiceM8: "servicem8.com",
  Pabau: "pabau.com", Dentally: "dentally.co", "Google Ads": "ads.google.com",
};
const MARKS: Record<string, [string, string, string]> = {
  HubSpot: ["#ffe8e1", "#e8674f", "Hu"], Pipedrive: ["#e3efe6", "#26714a", "Pd"],
  Zoho: ["#fdeaea", "#c94b3f", "Zo"], Close: ["#e5f0fb", "#3468c0", "Cl"],
  Capsule: ["#e4f2f4", "#2a8a99", "Ca"], Copper: ["#fbeee6", "#c07a3f", "Co"],
  Salesforce: ["#e2f2fb", "#1e8ac2", "Sf"], "Microsoft Dynamics 365": ["#e5ecfa", "#3450a8", "Dy"],
  "Google Calendar": ["#e8edfc", "#3f52b8", "GC"], Outlook: ["#e3edf8", "#0f6cbd", "Ou"],
  "Cal.com": ["#eceef2", "#22243c", "Cc"], Calendly: ["#e6effe", "#2f6de0", "Cy"],
  "WhatsApp Business": ["#e0f3e7", "#1f9d63", "WA"], SMS: ["#eef1fb", "#5877e8", "Sm"],
  Email: ["#f0eafa", "#7a5fc9", "Em"], Clio: ["#e3eefb", "#2d6bb4", "Cl"],
  ServiceM8: ["#e5eefa", "#2b62b8", "S8"], Pabau: ["#eae7fa", "#5c50b8", "Pa"],
  Dentally: ["#e0f2f0", "#1f8a7d", "De"], "Google Ads": ["#fdf1e1", "#d0913a", "GA"],
  Webhooks: ["#eceef2", "#3a3d5c", "Wh"], API: ["#eceef2", "#3a3d5c", "{}"],
};
const favicon = (name: string) => (DOMAINS[name] ? `https://www.google.com/s2/favicons?domain=${DOMAINS[name]}&sz=128` : null);

type Entry = { name: string; desc: string };
const CATALOGUE: { cat: string; items: Entry[] }[] = [
  { cat: "CRM", items: [
    { name: "HubSpot", desc: "Connect Rosebud straight to HubSpot. Every enquiry, qualification and booking syncs both ways, so your pipeline is current without anyone typing it in." },
    { name: "Pipedrive", desc: "Send every new lead directly into Pipedrive. Stages, owners and notes update themselves as the system works the lead." },
    { name: "Zoho", desc: "Full two-way sync with Zoho CRM. Leads, contacts and deals stay accurate on both sides, in real time." },
    { name: "Close", desc: "Built for teams who live in the CRM all day. Every outcome, booking and status change lands in Close as it happens." },
    { name: "Capsule", desc: "Connect Rosebud to Capsule. New enquiries arrive as contacts with their full history already attached, ready to work." },
    { name: "Copper", desc: "A natural fit for teams already running on Google Workspace. Leads, emails and meetings stay joined up across Copper and your calendar." },
    { name: "Salesforce", desc: "Enterprise-grade sync for larger operations. Every record, stage and value writes back into Salesforce as your system of record." },
    { name: "Microsoft Dynamics 365", desc: "Built for Microsoft-first businesses. Leads and appointments sync straight into Dynamics with no middle layer." },
  ] },
  { cat: "Calendar", items: [
    { name: "Google Calendar", desc: "Read live availability straight from your working diary. Slots are reserved in real time, so a double-booking cannot happen." },
    { name: "Outlook", desc: "Full Microsoft 365 calendar support. Rosebud books into the same diary your team already runs their week from." },
    { name: "Cal.com", desc: "Slot rules, buffers and routing, natively supported. Leads pick from real availability and the appointment is held instantly." },
    { name: "Calendly", desc: "Bookings written back the moment a slot is taken. Your Calendly stays the single source of truth for the diary." },
  ] },
  { cat: "Messaging", items: [
    { name: "WhatsApp Business", desc: "Answer enquiries where most of them now arrive. Rosebud replies in seconds in your brand voice, and the whole thread stays on the record." },
    { name: "SMS", desc: "Reach people on the channel they actually read. Confirmations, reminders and no-show recovery all go out automatically." },
    { name: "Email", desc: "Every sequence, from the first reply to long-term nurture. Sent from your domain and matched to your tone." },
  ] },
  { cat: "Industry", items: [
    { name: "Clio", desc: "Matter management for law firms, connected end to end. New enquiries arrive as matters with their details already attached." },
    { name: "ServiceM8", desc: "Job management for trades and home services. Enquiries become jobs, and site visits land in the right diary automatically." },
    { name: "Pabau", desc: "Clinic management for aesthetics and healthcare. Patient enquiries, bookings and recalls stay in sync with your practice system." },
    { name: "Dentally", desc: "Practice management built for dental. New patients and appointments flow straight into the system your front desk already runs on." },
  ] },
  { cat: "Advertising", items: [
    { name: "Google Ads", desc: "Qualified outcomes matched back to the click that created them. Delivered to your media team so your bidding chases customers instead of form-fills." },
  ] },
  { cat: "Developer", items: [
    { name: "Webhooks", desc: "Fire a live event to any system you run the second something happens. New enquiry, qualified, booked, no-show, re-engaged — each one posts to your endpoint as it lands." },
    { name: "API", desc: "Read and write your own records directly. Pull lead data into your reporting, push contacts in from a system we do not connect to yet, and build whatever sits on top." },
  ] },
];
const CATS = CATALOGUE.map((c) => c.cat);
const ALL: (Entry & { cat: string })[] = CATALOGUE.flatMap((c) => c.items.map((it) => ({ ...it, cat: c.cat })));

// ── Logo tile (favicon or lettermark) ─────────────────────────────────
function Logo({ name, size = 42 }: { name: string; size?: number }) {
  const src = favicon(name);
  const m = MARKS[name] || ["#eceef2", "#3a3d5c", name.slice(0, 2)];
  if (src) {
    return (
      <span style={{ width: size, height: size, borderRadius: 12, background: "#fff", border: "1px solid #eceef2", boxShadow: "0 4px 12px -6px rgba(60,66,120,.35)", display: "grid", placeItems: "center", flex: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={24} height={24} style={{ width: 24, height: 24, objectFit: "contain" }} />
      </span>
    );
  }
  return (
    <span style={{ width: size, height: size, borderRadius: 11, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, background: m[0], color: m[1], flex: "none" }}>{m[2]}</span>
  );
}

// ── Hero arc of rotating logos ────────────────────────────────────────
const ARC_NODES = [
  { t: 0.02, s: 34 }, { t: 0.14, s: 42 }, { t: 0.26, s: 50 }, { t: 0.38, s: 58 },
  { t: 0.62, s: 58 }, { t: 0.74, s: 50 }, { t: 0.86, s: 42 }, { t: 0.98, s: 34 },
];
const ARC_ROTATION = Object.keys(DOMAINS);
const arcPt = (t: number): [number, number] => {
  const x = (1 - t) * (1 - t) * 20 + 2 * (1 - t) * t * 430 + t * t * 840;
  const y = (1 - t) * (1 - t) * 158 + 2 * (1 - t) * t * -18 + t * t * 158;
  return [x, y];
};

function HeroArc() {
  const [offset, setOffset] = useState(0);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setFade(true);
      setTimeout(() => { setOffset((o) => o + 1); setFade(false); }, 350);
    }, 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 860, height: 190, margin: "50px auto 0" }}>
      <svg viewBox="0 0 860 190" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" aria-hidden>
        <path d="M20 158 Q 225 70 430 70" stroke="rgba(60,66,120,.28)" strokeWidth={2} strokeDasharray="1 9" strokeLinecap="round" style={{ animation: "rbArcFlow 1.6s linear infinite" }} />
        <path d="M840 158 Q 635 70 430 70" stroke="rgba(60,66,120,.28)" strokeWidth={2} strokeDasharray="1 9" strokeLinecap="round" style={{ animation: "rbArcFlow 1.6s linear infinite" }} />
      </svg>
      {ARC_NODES.map((n, i) => {
        const [x, y] = arcPt(n.t);
        const name = ARC_ROTATION[(i * 2 + offset) % ARC_ROTATION.length];
        return (
          <span key={i} style={{ position: "absolute", left: `${(x / 860) * 100}%`, top: `${(y / 190) * 100}%`, transform: "translate(-50%,-50%)", width: n.s, height: n.s, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", boxShadow: `0 ${Math.round(n.s * 0.3)}px ${Math.round(n.s * 0.6)}px -${Math.round(n.s * 0.24)}px rgba(44,47,74,.5), 0 0 0 6px rgba(255,255,255,.5)`, zIndex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={favicon(name) || ""} alt="" style={{ width: Math.round(n.s * 0.52), height: Math.round(n.s * 0.52), objectFit: "contain", transition: "opacity .35s ease, transform .35s ease", opacity: fade ? 0 : 1, transform: `scale(${fade ? 0.6 : 1})` }} />
          </span>
        );
      })}
      <span style={{ position: "absolute", left: "50%", top: "70px", transform: "translate(-50%,-50%)", width: 78, height: 78, borderRadius: "50%", overflow: "hidden", boxShadow: "0 22px 44px -16px rgba(44,47,74,.75), 0 0 0 10px rgba(255,255,255,.55)", zIndex: 2 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/rosebud-logo.png" alt="Rosebud" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
      </span>
    </div>
  );
}

export default function IntegrationsPage() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? ALL : ALL.filter((c) => c.cat === filter);
  const pill = (label: string) => {
    const on = label === filter;
    return (
      <button key={label} type="button" onClick={() => setFilter(label)} style={{ cursor: "pointer", fontSize: 12.5, fontWeight: 600, padding: "8px 17px", borderRadius: 20, border: "none", transition: "all .15s", background: on ? "#2c2f4a" : "#fff", color: on ? "#fff" : "#585b78", boxShadow: on ? "0 8px 18px -10px rgba(44,47,74,.8)" : "0 6px 16px -12px rgba(60,66,120,.6)" }}>{label}</button>
    );
  };

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#2c2f4a", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rbArcFlow{to{stroke-dashoffset:-20;}}
        .rb-int-wrap{max-width:1080px;margin:0 auto;padding:0 40px;}
        .rb-int-scene{container-type:inline-size;}
        .rb-int-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .rb-int-voices{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
        .rb-int-nocrm{display:grid;grid-template-columns:1.1fr 1fr;gap:64px;align-items:center;}
        @media(max-width:900px){
          .rb-int-wrap{padding:0 22px;}
          .rb-int-grid{grid-template-columns:1fr 1fr;}
          .rb-int-voices{grid-template-columns:1fr;}
          .rb-int-nocrm{grid-template-columns:1fr;gap:34px;}
        }
        @media(max-width:600px){ .rb-int-grid{grid-template-columns:1fr;} }
      ` }} />

      <RedesignNav />

      {/* ===================== HERO ===================== */}
      <section style={{ position: "relative", background: "radial-gradient(120% 90% at 78% 8%,#eeeafb 0%,#e6e2f4 45%,#dcd8ef 100%)", padding: "150px 0 70px" }}>
        <div className="rb-int-wrap">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px,4.6vw,50px)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "#22243c", margin: "0 0 20px" }}>Connect Rosebud to the software you already use every day</h1>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#6b6e8a", maxWidth: 580, margin: "0 auto 32px" }}>Your CRM, your calendar, your messaging, and the systems built for your trade. We connect to what you already run, so nothing has to be replaced and nobody has to learn a second dashboard.</p>
            <div style={{ display: "flex", justifyContent: "center" }}><BookDemoCTA label="See plans & pricing" href="/pricing" tone="light" /></div>
          </div>
          <HeroArc />
        </div>
      </section>

      {/* ===================== GRID ===================== */}
      <section style={{ background: "linear-gradient(180deg,#e6e2f4,#eef0f9 30%,#eef0f9)", padding: "80px 0 90px" }}>
        <div className="rb-int-wrap">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 34 }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px,3.4vw,36px)", color: "#22243c", margin: 0 }}>All integrations</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{["All", ...CATS].map(pill)}</div>
          </div>
          <div className="rb-int-grid">
            {visible.map((c) => (
              <div key={c.name} style={{ background: "#fff", borderRadius: 18, padding: "24px 24px 20px", boxShadow: "0 20px 40px -28px rgba(60,66,120,.55)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <Logo name={c.name} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#8a8ea6", background: "#f0f1f7", padding: "4px 11px", borderRadius: 12 }}>{c.cat}</span>
                </div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 19, color: "#26283f", margin: "0 0 8px" }}>{c.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.62, color: "#787b95", margin: 0, flex: 1 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NO CRM ===================== */}
      <section style={{ background: "#f4f1ea", padding: "90px 0 84px" }}>
        <div className="rb-int-wrap rb-int-nocrm">
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", color: "#a7a1c0", textTransform: "uppercase" }}>If you do not run a CRM</span>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,3.6vw,38px)", lineHeight: 1.12, color: "#22243c", margin: "16px 0 20px" }}>We build the system your business <em style={{ fontStyle: "italic", color: "#5877e8" }}>runs on</em></h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6b6e8a", margin: "0 0 30px" }}>Plenty of good businesses run on a shared inbox, a notebook and a very good memory. You do not need to go and buy software before you can start with us. We build you a system that holds every enquiry, conversation, booking and job in one place, shaped around how your business actually works. It comes as part of your setup, and everything in it is yours to export whenever you want.</p>
            <BookDemoCTA label="Book a consultation" href={DEMO} tone="light" />
          </div>
          <div className="rb-int-scene" style={{ position: "relative", width: "100%", aspectRatio: "1 / 0.86", borderRadius: 26, overflow: "hidden", background: "radial-gradient(90% 70% at 78% 8%,#f2ecd8,transparent 60%),linear-gradient(150deg,#efe9d4 0%,#e5d8b6 100%)", boxShadow: "0 30px 60px -28px rgba(96,84,44,.45)" }}>
            <div style={{ position: "absolute", left: "6%", top: "8%", width: "70%", background: "#fff", borderRadius: "2.8cqw", boxShadow: "0 2.6cqw 4.6cqw -1.8cqw rgba(96,84,44,.45)", overflow: "hidden" }}>
              <div style={{ background: "#2c2f4a", color: "#fff", padding: "1.7cqw 2.4cqw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: "2cqw" }}>Your system</span>
                <span style={{ fontSize: "1.3cqw", opacity: 0.7, fontWeight: 600 }}>Built for you</span>
              </div>
              <div style={{ padding: "1.6cqw 2.4cqw 2cqw" }}>
                {[["Enquiries", "Every one, on the record"], ["Conversations", "Full thread history"], ["Bookings", "Diary-synced"], ["Jobs", "Status tracked"]].map(([k, v], idx, arr) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1.6cqw", fontWeight: 600, color: "#4a4d68", padding: "1.15cqw 0", borderBottom: idx < arr.length - 1 ? "1px solid #f2f3f7" : "none" }}><span>{k}</span><span style={{ color: "#2c2f4a", fontWeight: 700 }}>{v}</span></div>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", right: "5%", bottom: "10%", display: "flex", flexDirection: "column", gap: "1.5cqw" }}>
              {[["#4fd18a", "Included in your setup"], ["#e8b84f", "Yours to export, any time"]].map(([dot, label]) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: "1cqw", background: "#fff", borderRadius: "2cqw", padding: "1.2cqw 1.9cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(96,84,44,.45)", fontSize: "1.5cqw", fontWeight: 700, color: "#2c2f4a" }}><span style={{ width: "1.7cqw", height: "1.7cqw", borderRadius: "50%", background: dot, boxShadow: `0 0 0 .4cqw ${dot}4d` }} />{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MISSING SOMETHING ===================== */}
      <section style={{ background: "#ece7de", padding: "84px 0 96px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 22px" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", color: "#a7a1c0", textTransform: "uppercase" }}>Missing something</span>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px,4.4vw,42px)", lineHeight: 1.12, color: "#22243c", margin: "18px 0 18px" }}>Not on the list?</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6b6e8a", maxWidth: 480, margin: "0 auto 34px" }}>Tell us what you run. New systems get added to the catalogue as clients need them, and we will tell you straight whether yours is a fit before you commit to anything.</p>
          <div style={{ display: "flex", justifyContent: "center" }}><BookDemoCTA label="Talk to us" href={DEMO} tone="light" /></div>
        </div>
      </section>

      {/* ===================== INDUSTRY LINKS (bottom) ===================== */}
      <section style={{ background: "#eef0f9", padding: "70px 0" }}>
        <div className="rb-int-wrap">
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#a7a1c0", textTransform: "uppercase" }}>Built for your industry</span>
          <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(22px,2.6vw,28px)", color: "#22243c", margin: "12px 0 22px", maxWidth: "42ch" }}>See how it runs in yours.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {INDUSTRY_LINKS.map((v) => (
              <a key={v.slug} href={`/industries/${v.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 999, padding: "11px 20px", fontSize: 14, fontWeight: 600, color: "#3a3d5c", boxShadow: "0 10px 24px -18px rgba(60,66,120,.6)", textDecoration: "none" }}>
                {v.name} <span style={{ color: "#a7a1c0", fontSize: 13 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <RedesignReveal />
      <RedesignFooter />
    </div>
  );
}
