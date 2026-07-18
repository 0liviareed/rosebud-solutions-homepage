// Data for the /capabilities/[slug] template (design: "Capture Page"). Sections
// 00 switcher, 05 voices, 06 close chrome are identical across every capability;
// 01–04 are per-capability content. Only Capture is populated for now.

export type DeepBlock = { num: string; kicker: string; title: string; body: string };
export type CapabilityData = {
  slug: string;
  name: string;
  hero: { headlinePre: string; headlineEm: string; subhead: string };
  works: { headlinePre: string; headlineEm: string; panels: string[] };
  integrationsSub: string;
  deep: DeepBlock[];
  close: { heading: string; subhead: string };
};

// ── Shared chrome data ───────────────────────────────────────────────────────
export const SIBLINGS: { name: string; slug: string }[] = [
  { name: "Capture", slug: "capture" },
  { name: "Qualify", slug: "qualify" },
  { name: "Book", slug: "book" },
  { name: "Retain", slug: "retain" },
  { name: "Reactivate", slug: "reactivate" },
  { name: "Follow through", slug: "follow-through" },
];
export const SIBLING_SUBLABEL = "Closed-loop attribution";
// Only these slugs have a live page; others render as "coming soon" (no link).
export const LIVE_SLUGS = new Set(["capture"]);

export const NAV_CAPABILITIES = [
  { head: "Capture", desc: "Speed-to-lead & omnichannel intake", slug: "capture" },
  { head: "Qualify", desc: "Lead scoring & routing", slug: "qualify" },
  { head: "Book", desc: "Calendar automation", slug: "book" },
  { head: "Retain", desc: "Automated reminders & no-show recovery", slug: "retain" },
  { head: "Reactivate", desc: "Lead nurture & database reactivation", slug: "reactivate" },
  { head: "Follow through", desc: "Workflow automation & AR chase", slug: "follow-through" },
  { head: "Closed-loop attribution", desc: "Conversion & value-based bidding", slug: "closed-loop-attribution" },
];
export const NAV_RESOURCES = [
  { head: "About", desc: "The company behind the system", href: "/about" },
  { head: "Pricing", desc: "Discussed live on your consultation", href: "/pricing" },
];

export const INT_LOGOS: { name: string; src: string; h: number }[] = [
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
export const INT_INDUSTRIES = [
  "Trades & Home Services",
  "Dental, Aesthetics & Healthcare",
  "Legal & Professional Services",
  "Mortgage & Financial Services",
];

export const VOICES = [
  { quote: "When something breaks, I message Anselm and he answers. That doesn't happen with agencies. You pay them and you're dealing with an account manager by week two.", name: "Eleanor Whitman", role: "Principal", ini: "EW" },
  { quote: "This isn't just about automation. It's about creating a better, faster experience that still feels personal and thoughtful.", name: "James Holloway", role: "Multi-Site Operator", ini: "JH" },
  { quote: "I used to do reporting on Sunday nights. I dreaded it. Now I open my laptop Monday morning and the week's already sorted. Getting my Sundays back was worth the fee on its own.", name: "Henry Caldwell", role: "Partner", ini: "HC" },
  { quote: "I'd been telling myself I'd sort this out for two years. Five weeks with Rosebud and it was done. One of the only things I've paid for this year that made my job smaller instead of bigger.", name: "Richard Sinclair", role: "Operations Director", ini: "RS" },
  { quote: "We had hundreds of leads sitting in a spreadsheet, not doing anything. Rosebud scored all of them, told us who was worth a call, and my team only talks to those ones now.", name: "Margaret Ellsworth", role: "Founder & CEO", ini: "ME" },
  { quote: "The thing that surprised me was the follow-ups sounded like me. Two people on calls last month mentioned how nice my emails were. I didn't write them, Rosebud did.", name: "Victoria Hastings", role: "Head of Marketing", ini: "VH" },
  { quote: "I thought if I wasn't chasing, deals would die. But we closed two last quarter from people I'd given up on months ago. Rosebud was still in touch when I wasn't.", name: "Edward Harrington", role: "Managing Director", ini: "EH" },
  { quote: "My phone used to ring before I'd finished my first coffee. Now I open my inbox and three calls are already on my calendar. I just read the notes and show up.", name: "Thomas Ashford", role: "Operations Director", ini: "TA" },
];

// ── Per-capability content ───────────────────────────────────────────────────
export const CAPABILITIES: Record<string, CapabilityData> = {
  capture: {
    slug: "capture",
    name: "Capture",
    hero: {
      headlinePre: "Inbound enquiries answered & logged in seconds. On every channel. At every ",
      headlineEm: "hour",
      subhead:
        "The moment someone reaches out via web form, WhatsApp, SMS, email, or social, the system executes a programmed response and writes the record straight to your CRM. No manual triage delays, no out-of-hours gaps.",
    },
    works: {
      headlinePre: "The intake layer, running as ",
      headlineEm: "one automated event",
      panels: ["/assets/works-panel-1.png", "/assets/works-panel-2.png", "/assets/works-panel-3.png"],
    },
    integrationsSub:
      "Capture writes straight into the CRM, calendar, and messaging tools your team already lives in, with no new dashboard to learn.",
    deep: [
      {
        num: "01",
        kicker: "Listen",
        title: "Continuous intake listener",
        body: "After-hours enquiries are the ones a staffed team structurally cannot catch: the 9pm web form, the Sunday WhatsApp. The intake layer runs on a continuous listener, not a shift, so an out-of-hours submission triggers the same response-and-log sequence as a midday one. The demand you paid for at midnight is processed at midnight, not queued for Monday.",
      },
      {
        num: "02",
        kicker: "Bind",
        title: "Zero-latency response binding",
        body: "An enquiry that waits five minutes has already begun looking elsewhere. Capture and response are bound into a single event on the same trigger, so there is no triage queue to sit in. The reply fires on intake, generated against your brand voice, tone, and positioning rules. Sub-second response, in the voice of your best operator. First to respond enters the conversation first.",
      },
      {
        num: "03",
        kicker: "Record",
        title: "Structured record at source",
        body: "Every enquiry is written as a structured record at the moment of contact: contact, channel origin, source, and the ad click identifier where the lead came from paid media. That normalised record is the single object every downstream workflow reads from, so qualification, booking, reactivation, and attribution all build on the same clean foundation.",
      },
    ],
    close: {
      heading: "Ready to stabilise your front office?",
      subhead:
        "We deploy, manage, and monitor the entire intake layer for you as an operated rental service, connecting directly to your existing CRM and calendars. The system handles the workflow up to the booking using your exact tone; your team closes the sale.",
    },
  },
};
