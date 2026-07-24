/* Integrations — two auto-scrolling logo marquees + vertical footnote.
   Ported from the design export. */

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const BASE = "/assets/integrations/";

type Logo = { name: string; src: string; h: number };
const LOGOS: Logo[] = [
  { name: "Zoho", src: "zoho.png", h: 64 },
  { name: "HubSpot", src: "hubspot.webp", h: 40 },
  { name: "Pipedrive", src: "pipedrive.webp", h: 34 },
  { name: "Close", src: "close.png", h: 60 },
  { name: "Capsule", src: "capsule.png", h: 40 },
  { name: "Salesforce", src: "salesforce.png", h: 46 },
  { name: "Microsoft Dynamics 365", src: "microsoft-dynamics-365.webp", h: 52 },
  { name: "Method", src: "method.webp", h: 50 },
  { name: "Cal.com", src: "cal-com.png", h: 54 },
  { name: "Google Calendar", src: "google-calendar.png", h: 56 },
  { name: "Outlook", src: "outlook.png", h: 48 },
  { name: "Calendly", src: "calendly.webp", h: 56 },
  { name: "WhatsApp", src: "whatsapp.png", h: 52 },
  { name: "Twilio", src: "twilio.png", h: 40 },
  { name: "Brevo", src: "brevo.png", h: 36 },
  { name: "Google Ads", src: "google-ads.png", h: 46 },
  { name: "Clio", src: "clio.png", h: 44 },
  { name: "ServiceM8", src: "servicem8.png", h: 50 },
  { name: "Pabau", src: "pabau.png", h: 44 },
  { name: "Dentally", src: "dentally.png", h: 36 },
];
const MID = Math.ceil(LOGOS.length / 2);
const ROW_A = LOGOS.slice(0, MID);
const ROW_B = LOGOS.slice(MID);

const VERTICALS = [
  { label: "Trades & Home Services", href: "/industries/trades-home-services" },
  { label: "Dental, Aesthetics & Healthcare", href: "/industries/dental-aesthetic" },
  { label: "Legal & Professional", href: "/industries/family-law" },
  { label: "Mortgage & Lending", href: "/industries/mortgage-lending" },
];

const MARQUEE_CSS = `
@keyframes rbMarquee { from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
@keyframes rbMarqueeR { from{ transform:translateX(-50%); } to{ transform:translateX(0); } }
`;

function Tile({ l }: { l: Logo }) {
  return (
    <div style={{ flex: "none", width: 180, height: 82, borderRadius: 16, background: "#FBFAF7", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 18px 40px -26px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 26px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BASE + l.src} alt={l.name} loading="lazy" style={{ height: l.h, width: "auto", maxWidth: 152, objectFit: "contain", display: "block" }} />
    </div>
  );
}

export default function Integrations() {
  return (
    <section className="rb-pad" style={{ position: "relative", overflow: "hidden", background: "#080609", color: "#F5F1EA", padding: "130px 48px" }}>
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18 }}>Integrations</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,5vw,74px)", lineHeight: 1.02, letterSpacing: "-0.01em", maxWidth: "17ch", margin: 0 }}>Connect to the software you already use every day</h2>

        <div style={{ marginTop: 56, position: "relative", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)" }}>
          <div style={{ overflow: "hidden", padding: "4px 0" }}>
            <div style={{ display: "flex", width: "max-content", gap: 16, animation: "rbMarquee 60s linear infinite" }}>
              {[...ROW_A, ...ROW_A].map((l, i) => <Tile key={`a${i}`} l={l} />)}
            </div>
          </div>
          <div style={{ overflow: "hidden", padding: "4px 0", marginTop: 16 }}>
            <div style={{ display: "flex", width: "max-content", gap: 16, animation: "rbMarqueeR 52s linear infinite" }}>
              {[...ROW_B, ...ROW_B].map((l, i) => <Tile key={`b${i}`} l={l} />)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 44 }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#6E6784", marginBottom: 14 }}>How businesses like yours use Rosebud</div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 18px" }}>
            {VERTICALS.map((p) => (
              <a key={p.href} href={p.href} style={{ fontSize: 14, letterSpacing: ".01em", color: "#8F86B0", textDecoration: "none" }}>{p.label}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
