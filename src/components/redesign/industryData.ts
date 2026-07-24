// Data for the /industries/* pages on the redesign template. ONE template shape —
// the §5 retarget shape — used by every industry page: an H1 carrying the target
// query, a 40–60-word direct answer, question-shaped H2 sections each answered
// answer-first, an optional "what stays with you" boundary block, and an FAQ.
//
// DRAFT COPY: family-law's copy is a draft off the current live page, restructured
// and retargeted to "legal intake software" — it does NOT ship until Saj + Jay edit
// it. Trades is a STRUCTURAL migration only (current copy mapped into the shape); its
// copy retarget (plumbing crm, HVAC, §4.6) is a later pass.

export type IndustrySection = { h2: string; body: string; bullets?: string[] };
export type IndustryFaq = { q: string; a: string };
export type IndustryBoundary = { eyebrow: string; heading: string; items: string[]; note?: string };

export type IndustryData = {
  slug: string;
  name: string;
  accent: string;
  seo: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: { eyebrow: string; h1: string; intro: string }; // intro = the 40–60-word direct answer
  sections: IndustrySection[]; // question-shaped H2s, answer-first
  boundary?: IndustryBoundary;
  faqs: IndustryFaq[];
  related?: { href: string; title: string; desc: string }[];
  close: { heading: string; subhead: string };
  schema: { serviceType: string; areaServed: string; serviceDescription: string; offerDescription: string; breadcrumbName: string };
};

// "Rosebud for [industry]" hero switcher — the interlinked cluster (canonical order).
export const INDUSTRY_SIBLINGS: { name: string; slug: string }[] = [
  { name: "Dental, Aesthetic & Private Healthcare", slug: "healthcare" },
  { name: "Family Law & Consumer Legal", slug: "family-law" },
  { name: "Mortgage & Lending", slug: "mortgage-lending" },
  { name: "Insurance", slug: "insurance" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Trades & Home Services", slug: "trades-home-services" },
  { name: "Recruitment", slug: "recruitment" },
];

// In-scope industry links for the two crawl-route locations (capability-page
// integrations row + the integrations-page footer). Recruitment EXCLUDED (410).
// Single source of truth: edit the one slug at healthcare→dental-aesthetic.
export const INDUSTRY_LINKS: { name: string; slug: string }[] = [
  { name: "Dental, Aesthetic & Private Healthcare", slug: "healthcare" },
  { name: "Family Law & Consumer Legal", slug: "family-law" },
  { name: "Mortgage & Lending", slug: "mortgage-lending" },
  { name: "Insurance", slug: "insurance" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Trades & Home Services", slug: "trades-home-services" },
];

const DEMO = "https://cal.eu/rosebudsolutions/demo";
export { DEMO };

// ── /industries/family-law — RETARGET DRAFT (reference) ───────────────────────
// Primary target: legal intake software · secondary: law firm crm, client intake
// software, legal client intake software, law firm intake software. US vocabulary.
// Positioning: Rosebud feeds the practice-management system (Clio, MyCase…), never
// replaces it. Boundary block kept — acceptance of representation is the attorney's.
export const FAMILY_LAW: IndustryData = {
  slug: "family-law",
  name: "Family Law & Consumer Legal",
  accent: "#5B76C9",
  seo: {
    title: "Legal Intake Software for Family Law Firms — Rosebud Solutions",
    description:
      "Legal intake software that answers every inquiry, qualifies it against your rules, and books the consult — then writes it into Clio, MyCase or PracticePanther. Acceptance of representation always stays with the attorney.",
    ogTitle: "Legal Intake Software for Family Law & Consumer Legal | Rosebud Solutions",
    ogDescription:
      "The intake layer between a new inquiry and a booked consultation — captured, qualified, and synced to your case management system. Built around your firm; acceptance stays with the attorney.",
  },
  hero: {
    eyebrow: "By Industry · Family Law & Consumer Legal",
    h1: "Legal intake software that turns an inquiry into a booked consult — without touching your judgment",
    intro:
      "Legal intake software is the layer between a new inquiry and a booked consultation. Rosebud runs it for family law and consumer firms: it answers every inquiry in seconds, captures matter type, opposing party and jurisdiction for your conflict-check review, books the consult, and writes the record into your case management system. It never accepts a matter — that decision is always the attorney's.",
  },
  sections: [
    {
      h2: "What is legal intake software?",
      body:
        "Legal intake software is the layer between a new inquiry and a booked consultation. It answers the prospective client, captures the matter details your firm screens on, and books the appointment — then files the record into your case management system. Rosebud operates that layer for your firm as a managed service; it feeds your practice-management system, it does not replace it.",
    },
    {
      h2: "What happens to an inquiry that isn't answered fast enough?",
      body:
        "It calls the next firm on the list. A family law inquiry usually lands at an urgent, emotional moment, and the firm that responds first wins the consult. The intake layer replies in seconds across every channel — a missed call gets a text back with an intake link, a web form gets an immediate answer — so the matter is captured before the prospect moves on.",
      bullets: [
        "Every inquiry answered in under 60 seconds, day or night.",
        "Matter type, opposing party and jurisdiction captured for your conflict-check review.",
      ],
    },
    {
      h2: "How does legal intake software qualify a potential client?",
      body:
        "Through structured conversation, against your own rules. It captures matter type, opposing party, jurisdiction and the facts your firm screens on — prepared for your conflict-check review, never run automatically. Routine questions are answered without an attorney; anything that needs one is routed with full context attached, so your team spends its time on the matters worth taking.",
    },
    {
      h2: "What has to reach an attorney, and what doesn't?",
      body:
        "Acceptance of representation always reaches the attorney — it is never automated. Matters flagged by your rules, and anything urgent, route immediately with context attached. Routine intake, scheduling, document collection and status updates run without you. The line is deliberate: it is exactly what makes the system safe to run inside a regulated practice.",
    },
    {
      h2: "How does legal intake software connect to a firm's case management system?",
      body:
        "It writes into it. Rosebud syncs the captured record — contact, matter, conflict inputs, engagement status — into Clio, MyCase, PracticePanther, Smokeball, CosmoLex or Filevine, which stays your system of record. Clio is a system we feed, not one we replace. Your case managers open a complete file, not a half-filled intake form.",
    },
    {
      h2: "What does legal intake software cost?",
      body:
        "Pricing is per plan, scoped to your matter volume and the size of your firm — the tiers and figures are published on the pricing page, and we walk through the fit on a demo call. There is no per-seat pricing and no lock-in; you can cancel any time.",
    },
  ],
  boundary: {
    eyebrow: "Where the line is",
    heading: "What stays with you.",
    items: [
      "Legal drafting — petitions, motions, pleadings, settlement positions. Yours.",
      "Conflict checks — we capture the inputs; you run the check.",
      "Legal advice — every client conversation is procedural only; legal questions route to you.",
      "Court filing — we prepare; you file.",
      "Discovery review — we organize; you review.",
      "Emotional counsel — we handle the admin; you handle clients.",
    ],
    note: "Acceptance of representation is always the attorney's decision, never automated. This isn't a limitation — it's the reason the system is safe to deploy in a regulated practice.",
  },
  faqs: [
    { q: "How fast does the system respond to a new inquiry?", a: "Under 60 seconds, every time, across every channel and after hours. A missed call gets a text back with an intake link; a web form gets an immediate reply. The matter is captured with type, opposing party and jurisdiction before the prospect contacts another firm." },
    { q: "Does the system run conflict checks?", a: "No. It captures the conflict inputs — matter type, opposing party, related parties, jurisdiction — and prepares them for your review. The conflict check itself is always run by the firm. Acceptance of representation is never automated." },
    { q: "How does the engagement workflow work once we accept a matter?", a: "Once the attorney accepts the matter, the engagement letter goes out, signature is chased, and the retainer is tracked — all written into your case management system. The acceptance decision stays with the attorney; everything administrative around it is handled." },
    { q: "How does it connect to our case management system?", a: "It writes the record into Clio, MyCase, PracticePanther, Smokeball, CosmoLex or Filevine, which remains your system of record. Rosebud feeds your practice-management system; it does not replace it." },
    { q: "How are deadlines and scheduling handled?", a: "Deadlines are computed off your triggers and reminders fire automatically. Consultations, depositions and mediations are booked against live availability and confirmed, with reschedules handled in-conversation." },
    { q: "How is client communication handled without giving legal advice?", a: "Client updates are strictly procedural — document filed, hearing scheduled, deadline approaching. Anything substantive or legal is routed to the attorney. The system never interprets or advises." },
    { q: "Is this designed to operate inside attorney ethics obligations?", a: "The system is built around the boundaries of a regulated practice — procedural-only client communication, conflict inputs captured for your review, acceptance reserved to the attorney, and confidentiality maintained. It extends the intake function; it does not practice law." },
    { q: "How do you make sure it launches safely?", a: "Every workflow is built around how your firm actually runs — your matters, your courts, your intake rules, your tone — across a five-week deployment. You test it and sign it off. By go-live you know exactly what it says, how it escalates, and where the line to the attorney sits." },
  ],
  related: [
    { href: "/industries/mortgage-lending", title: "Mortgage & Lending", desc: "For loan officers facing title, foreclosure or document-review questions inside live loans." },
    { href: "/industries/real-estate", title: "Real Estate", desc: "For agents needing transactional support on closings, contract review and title escalations." },
    { href: "/industries/insurance", title: "Insurance", desc: "For brokers referring personal-injury and first-party claims work to plaintiff-side attorneys." },
  ],
  close: {
    heading: "See how legal intake runs for your firm.",
    subhead: "Built around your matters, your courts, and the case management system you already run — live in five weeks. Plans and pricing on the page.",
  },
  schema: {
    serviceType: "Legal Intake Software (managed)",
    areaServed: "United States",
    serviceDescription:
      "Managed legal intake software for family law and consumer legal firms: answers every inquiry, captures matter type, opposing party and jurisdiction for the firm's conflict-check review, books consultations, runs the engagement workflow, and writes the record into Clio, MyCase, PracticePanther, Smokeball, CosmoLex or Filevine. Acceptance of representation is always the attorney's decision.",
    offerDescription: "Per-plan pricing scoped to matter volume and firm size. Tiers published on the pricing page.",
    breadcrumbName: "Family Law & Consumer Legal",
  },
};

// ── /industries/trades-home-services — STRUCTURAL migration only ──────────────
// Copy carried over from the verbatim reference (voice-corrected). Mapped into the
// §5 sections so it rides the one template. NOT retargeted — plumbing crm / HVAC /
// §4.6 copy is a later pass.
export const TRADES: IndustryData = {
  slug: "trades-home-services",
  name: "Trades & Home Services",
  accent: "#C77E4B",
  seo: {
    title: "Trades & Home Services — AI Workflow for Trades Offices",
    description:
      "AI for trades and home services: every inquiry replied to in under 60 seconds, jobs qualified, quotes chased, paperwork collected, past customers brought back. Built around ServiceTitan, Jobber, Housecall Pro, FieldEdge, simPRO, ServiceM8. Live in 5 weeks.",
    ogTitle: "Trades & Home Services — AI Workflow for Trades Offices | Rosebud Global",
    ogDescription:
      "A custom system that replies to every customer inquiry, qualifies every job, chases every quote, collects every paperwork request, and follows up every past customer for repeat work. Built around your job management system. Live in 5 weeks.",
  },
  hero: {
    eyebrow: "By Industry · Trades & Home Services",
    h1: "Your office runs the business. We run the office.",
    intro:
      "The admin your office team shouldn't be doing: texting back every missed call, qualifying every job, chasing every quote, handling the paperwork, and following up past customers for repeat work. Built around your job management system, run by Rosebud, up in five weeks.",
  },
  sections: [
    { h2: "Inquiry capture", body: "Every inquiry replied to in under 60 seconds, across every channel. The 7am boiler emergency reaches you first." },
    { h2: "Job qualification & triage", body: "Type of work, urgency, budget, access — captured before your office touches the file. Emergencies routed to dispatch. Time-wasters never reach you." },
    { h2: "Survey & quote booking", body: "Slots offered against live diary. Right tech sent to the right job. The office stops being the bottleneck." },
    { h2: "Quote follow-up & conversion", body: "Most trades send quotes and hope. We run the quote like a sales pipeline — the 48-hour follow-up, the “let me think about it” nurture, the price objection handled before it kills the job. Conversion on the quotes you already send, doubled or tripled." },
    { h2: "Paperwork & documentation chase", body: "Deposit invoices, signed quotes, site photos, insurance docs, building control sign-off — collected in conversation, not chased by email. Filed straight into your system." },
    { h2: "Status updates to customers", body: "“When are you arriving?” answered before it's asked. Daily or job-stage updates sent automatically. The office only involved when a human is genuinely needed." },
    { h2: "Invoicing, payment chase & customer follow-up", body: "Invoices out automatically. Payment reminders on the cadence that gets you paid. Then — the part most trades skip — every customer followed up at 3, 6, 12 months. Repeat work and referrals stop being accidental." },
  ],
  faqs: [
    { q: "How fast does the system respond to a new inquiry?", a: "Under 60 seconds, every time. Most calls land while your team is on a job — the ones that ring out get a text back in seconds, qualified, then booked, dispatched, or handed back with full context." },
    { q: "How does the system qualify a job before it reaches my office?", a: "Type of work, property type, urgency, budget, access — captured in conversation. Emergencies flagged. Time-wasters answered without reaching your team." },
    { q: "How does the system chase quotes?", a: "Every quote followed up on a structured cadence — 24 hours, 48 hours, 7 days. The \"let me think about it\" gets a nurture sequence. Price objections handled before they kill the job." },
    { q: "How does the system handle \"when are you arriving\" messages?", a: "Daily or job-stage updates sent automatically. Office only involved when something genuinely needs a human." },
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
    subhead: "One system that replies, qualifies, books, chases, and follows up — built around how your business already runs, live in five weeks.",
  },
  schema: {
    serviceType: "AI Automation System for Trades & Home Services Offices",
    areaServed: "United Kingdom",
    serviceDescription:
      "Custom system that captures every customer inquiry across missed calls, web, and social channels, qualifies each job, books surveys, chases quotes and paperwork, sends status updates, and follows up past customers for repeat work. Built around your job management system. Built and run by Rosebud for trades and home services businesses.",
    offerDescription: "Pricing scoped to job volume and the size of your office team. Shared on demo call.",
    breadcrumbName: "Trades & Home Services",
  },
};

export const INDUSTRIES: Record<string, IndustryData> = {
  "family-law": FAMILY_LAW,
  "trades-home-services": TRADES,
};
