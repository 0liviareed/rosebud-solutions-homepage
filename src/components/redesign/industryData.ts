// Data for the /industries/[*] pages on the redesign template. Mirrors the
// capabilityData pattern: one IndustryPage component fed per-slug. Content parity
// with the June pages is a data-completeness rule — every section and substantive
// line ports across; the template flexes, the copy does not get cut.

export type IndustryRole = { num: string; label: string; body: string };
export type IndustryFaq = { q: string; a: string };

export type IndustryData = {
  slug: string;
  name: string;        // display name, e.g. "Trades & Home Services"
  accent: string;      // per-industry tint for the generic mocks
  seo: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: { eyebrow: string; headlinePre: string; headlineEm: string; subhead: string };
  // "Every deployment includes" intro that leads the seven-role section.
  deploy: { h2Pre: string; h2Em: string; body: string; bodyQuiet: string; after: string[] };
  roles: IndustryRole[];
  // Optional "what stays with you" boundary block (family-law, healthcare clinical line).
  boundary?: { eyebrow: string; heading: string; items: string[]; note?: string };
  faqs: IndustryFaq[];
  related?: { href: string; title: string; desc: string }[];
  close: { heading: string; subhead: string };
  // JSON-LD source values (ported verbatim from the June pages).
  schema: { serviceType: string; areaServed: string; serviceDescription: string; offerCurrency: string; offerDescription: string; breadcrumbName: string };
};

// The seven industry pages, for the "Rosebud for [industry]" hero switcher — the
// interlinked cluster (each page links to the other six). Kept in canonical order.
export const INDUSTRY_SIBLINGS: { name: string; slug: string }[] = [
  { name: "Dental, Aesthetic & Private Healthcare", slug: "healthcare" },
  { name: "Family Law & Consumer Legal", slug: "family-law" },
  { name: "Mortgage & Lending", slug: "mortgage-lending" },
  { name: "Insurance", slug: "insurance" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Trades & Home Services", slug: "trades-home-services" },
  { name: "Recruitment", slug: "recruitment" },
];

// ── /industries/trades-home-services — verbatim port (reference page) ──────────
// Copy is IDENTICAL to the June page. No retarget, no US re-vocab, no voice scrub.
// This page exists to prove the template holds the old content without loss.
export const TRADES: IndustryData = {
  slug: "trades-home-services",
  name: "Trades & Home Services",
  accent: "#C77E4B",
  seo: {
    title: "Trades & Home Services — AI Workflow for Trades Offices",
    description:
      "AI for trades and home services: every inquiry answered in under 60 seconds, jobs qualified, quotes chased, paperwork collected, past customers brought back. Built around ServiceTitan, Jobber, Housecall Pro, FieldEdge, simPRO, ServiceM8. Live in 5 weeks.",
    ogTitle: "Trades & Home Services — AI Workflow for Trades Offices | Rosebud Global",
    ogDescription:
      "A custom system that answers every customer inquiry, qualifies every job, chases every quote, collects every paperwork request, and follows up every past customer for repeat work. Built around your job management system. Live in 5 weeks.",
  },
  hero: {
    eyebrow: "By Industry · Trades & Home Services",
    headlinePre: "Your office runs the business. ",
    headlineEm: "We run the office.",
    subhead:
      "The admin your office team shouldn't be doing: texting back every missed call, qualifying every job, chasing every quote, handling the paperwork, and following up past customers for repeat work. Built around your job management system. We run it.",
  },
  deploy: {
    h2Pre: "One system. ",
    h2Em: "All seven roles.",
    body: "Built around your office. One setup. One monthly figure. No per-seat pricing. Live in 5 weeks.",
    bodyQuiet:
      "Built around the work you do, the customers you serve, and the systems you already run — ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, Tradify, simPRO, ServiceM8.",
    after: ["No lock-in. Cancel any time.", "Pricing shared on the demo call — scoped to job volume and office size."],
  },
  roles: [
    { num: "I", label: "Inquiry Capture Engine", body: "Every inquiry answered in under 60 seconds, across every channel. The 7am boiler emergency reaches you first." },
    { num: "II", label: "Job Qualification & Triage", body: "Type of work, urgency, budget, access — captured before your office touches the file. Emergencies routed to dispatch. Time-wasters never reach you." },
    { num: "III", label: "Survey & Quote Booking", body: "Slots offered against live diary. Right tech sent to the right job. Office stops being the bottleneck." },
    { num: "IV", label: "Quote Follow-Up & Conversion", body: "Most trades send quotes and hope. We run the quote like a sales pipeline. The 48-hour follow-up. The “let me think about it” nurture. The price objection handled before it kills the job. Conversion on the quotes you already send — doubles or triples." },
    { num: "V", label: "Paperwork & Documentation Chase", body: "Deposit invoices, signed quotes, site photos, insurance docs, building control sign-off — collected in conversation, not chased by email. Filed straight into your system." },
    { num: "VI", label: "Status Updates to Customers", body: "“When are you arriving?” answered before it's asked. Daily or job-stage updates sent automatically. Office only involved when a human is genuinely needed." },
    { num: "VII", label: "Invoicing, Payment Chase & Customer Follow-Up", body: "Invoices out automatically. Payment reminders on the cadence that gets you paid. Then — the part most trades skip — every customer followed up at 3, 6, 12 months. Repeat work and referrals stop being accidental." },
  ],
  faqs: [
    { q: "How fast does the system respond to a new inquiry?", a: "Under 60 seconds, every time. Most calls land while your team is on a job — the ones that ring out get a text back in seconds, qualified, then booked, dispatched, or handed back with full context." },
    { q: "How does the system qualify a job before it reaches my office?", a: "Type of work, property type, urgency, budget, access — captured in conversation. Emergencies flagged. Time-wasters answered without reaching your team." },
    { q: "How are jobs routed to the right person or trade?", a: "We read the conversation, identify fit, and route to the right estimator, dispatcher, or tech with full context." },
    { q: "How does the system chase quotes?", a: "Every quote followed up on a structured cadence — 24 hours, 48 hours, 7 days. The \"let me think about it\" gets a nurture sequence. Price objections handled before they kill the job." },
    { q: "How does the system handle paperwork chase?", a: "Through guided conversation, not email. Each document requested at the right point, walked through with the customer, filed into your system." },
    { q: "How does the system handle \"when are you arriving\" messages?", a: "Daily or job-stage updates sent automatically. Office only involved when something genuinely needs a human." },
    { q: "How does the system handle invoicing and payment chase?", a: "Invoices out at completion. Reminders on the cadence that gets you paid. Aged debtor reports surfaced before they become a problem." },
    { q: "How does the system bring back past customers?", a: "Every customer followed up at 3, 6, 12 months. Service reminders, annual inspections, next projects. Repeat work stops being accidental." },
    { q: "Which job management systems do you integrate with?", a: "ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Workiz, Tradify, simPRO, ServiceM8 — and most platforms trades businesses actually run." },
    { q: "How do you make sure the system launches safely?", a: "Built around how your office runs — your trades, your job types, your tone. Five-week deployment. You test it, you sign it off. By go-live, you know exactly what it says." },
  ],
  related: [
    { href: "/industries/real-estate", title: "Real Estate", desc: "For the agents booking your team for pre-list repairs and post-close handovers." },
    { href: "/industries/insurance", title: "Insurance", desc: "For the brokers routing claims your way — restoration, roofing, plumbing emergencies." },
    { href: "/industries/mortgage-lending", title: "Mortgage & Lending", desc: "For the LOs needing appraisal-flagged repairs done before close." },
  ],
  close: {
    heading: "Put your office on autopilot.",
    subhead: "One system that answers, qualifies, books, chases, and follows up — built around how your business already runs, live in five weeks.",
  },
  schema: {
    serviceType: "AI Automation System for Trades & Home Services Offices",
    areaServed: "United Kingdom",
    serviceDescription:
      "Custom system that captures every customer inquiry across missed calls, web, and social channels, qualifies each job, books surveys, chases quotes and paperwork, sends status updates, and follows up past customers for repeat work. Built around your job management system. Built and run by Rosebud for trades and home services businesses.",
    offerCurrency: "GBP",
    offerDescription: "Pricing scoped to job volume and the size of your office team. Shared on demo call.",
    breadcrumbName: "Trades & Home Services",
  },
};

export const INDUSTRIES: Record<string, IndustryData> = {
  "trades-home-services": TRADES,
};
