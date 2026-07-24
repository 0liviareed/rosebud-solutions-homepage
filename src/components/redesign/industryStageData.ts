/*
 * Data for the staged IndustryStagePage design (Dora "Trades" / "Legal"
 * mockups): hero → 3 stages + pull-stat → optional "what stays with you"
 * boundary → dark FAQ → related → offer CTA.
 *
 * Copy is lifted from the approved mockups; FAQ answers are drafted on-voice.
 * Everything ships to the `redesign` PREVIEW branch only — it does not go to
 * production (main) until Saj + Jay sign off the layout and the copy.
 *
 * Scenes: each stage carries a code-drawn fallback (industryScenes). When a
 * supplied 2× PNG is dropped into /public/assets/industries/<slug>/, set
 * `img` on the scene ref and the page swaps to it.
 */

export type StageItem = { title: string; body: string };
export type StageCardTone = "indigo" | "green" | "amber" | "teal";
export type StageCard = { tag: string; tone: StageCardTone; h3: string; body: string };
export type StageScene = { id: string; tone: "lilac" | "peach"; img?: string };
export type StageSplit = { index: string; eyebrow: string; h2: string; items: StageItem[]; scene: StageScene };
export type StageCards = { index: string; eyebrow: string; h2: string; cards: StageCard[] };
export type BoundaryItem = { label: string; body: string };
export type StageBoundary = { eyebrow: string; heading: string; items: BoundaryItem[]; note?: string };
export type StageFaq = { q: string; a: string };
export type StageRelated = { title: string; desc: string; href: string };

export type IndustryStageData = {
  slug: string;
  name: string; // switcher label
  seo: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: { eyebrow?: string; h1: string; intro: string };
  stage1: StageSplit;
  stage2: StageCards;
  pullStat: { pre: string; accent: string };
  stage3: StageSplit;
  boundary?: StageBoundary;
  faqs: StageFaq[];
  related: StageRelated[];
  close: { heading: string; subhead: string };
  schema: {
    serviceType: string;
    areaServed: string;
    serviceDescription: string;
    offerDescription: string;
    breadcrumbName: string;
  };
};

// ─────────────────────────────────────────────────────────────────────
// TRADES & HOME SERVICES
// ─────────────────────────────────────────────────────────────────────
export const TRADES_STAGE: IndustryStageData = {
  slug: "trades-home-services",
  name: "Trades & Home Services",
  seo: {
    title: "Field Service & Trades Automation | Rosebud Solutions",
    description:
      "The office admin your team shouldn't be doing — missed calls, qualifying, quote chasing, paperwork, follow-up — built around your job management system and run by Rosebud. Live in five weeks.",
    ogTitle: "Put your office on autopilot — Rosebud for Trades & Home Services",
    ogDescription:
      "One system that replies in under a minute, qualifies the job, books it against the live diary, chases the quote and follows up — built around how your business already runs.",
  },
  hero: {
    h1: "Your office runs the business. We run the office.",
    intro:
      "The admin your office team shouldn't be doing — missed calls, qualifying, quote chasing, paperwork, follow-up — built around your job management system, run by Rosebud, up in five weeks.",
  },
  stage1: {
    index: "01",
    eyebrow: "Win the job",
    h2: "Every inquiry answered, qualified & booked",
    items: [
      { title: "Inquiry capture", body: "Replied to in under 60 seconds, across every channel. The 7am boiler emergency reaches you first." },
      { title: "Job qualification & triage", body: "Type of work, urgency, budget, access — captured before your office touches the file." },
      { title: "Survey & quote booking", body: "Slots offered against the live diary. Right tech sent to the right job." },
    ],
    scene: { id: "trades-win", tone: "lilac" },
  },
  stage2: {
    index: "02",
    eyebrow: "Run the job",
    h2: "The chasing, handled in the background",
    cards: [
      { tag: "48-hr cadence", tone: "indigo", h3: "Quote follow-up & conversion", body: "Every quote run like a sales pipeline — the follow-up, the “let me think about it” nurture, the price objection handled before it kills the job." },
      { tag: "Filed automatically", tone: "green", h3: "Paperwork & documentation", body: "Deposit invoices, signed quotes, site photos, sign-offs — collected in conversation, not chased by email, filed straight into your system." },
      { tag: "Before it's asked", tone: "amber", h3: "Status updates to customers", body: "“When are you arriving?” answered automatically at every job stage. The office only steps in when a human is genuinely needed." },
    ],
  },
  pullStat: { pre: "Conversion on the quotes you already send — ", accent: "doubled or tripled." },
  stage3: {
    index: "03",
    eyebrow: "Get paid & repeat",
    h2: "Invoiced, chased & followed up",
    items: [
      { title: "Invoicing & payment chase", body: "Invoices out automatically, reminders on the cadence that gets you paid." },
      { title: "Customer follow-up", body: "Every customer followed up at 3, 6 & 12 months. Repeat work & referrals stop being accidental." },
    ],
    scene: { id: "trades-paid", tone: "peach" },
  },
  faqs: [
    { q: "How fast does the system respond to a new inquiry?", a: "Under 60 seconds, on every channel. A missed call gets a text back with a booking link within seconds; web-form and WhatsApp enquiries get an immediate reply. The 7am boiler emergency reaches you before it reaches the next firm on the list." },
    { q: "How does the system qualify a job before it reaches my office?", a: "It captures type of work, urgency, budget and access in the first exchange, so your office opens a file that's already triaged. Emergencies are flagged and time-wasters filtered before anyone on your team picks up." },
    { q: "How does the system chase quotes?", a: "Every quote is run like a sales pipeline — automatic follow-up on the cadence that converts, the “let me think about it” nurture, and price objections handled before they kill the job. Nothing sits in an inbox waiting to be forgotten." },
    { q: "How does the system handle “when are you arriving” messages?", a: "Status updates go out automatically at each job stage, so customers know when the engineer is coming without anyone in the office answering the phone. A human only steps in when the question genuinely needs one." },
    { q: "Which job management systems do you integrate with?", a: "It's built around the system you already run — ServiceM8, Simpro, Tradify, Jobber, Housecall Pro and the rest. Rosebud feeds your job management system; it doesn't replace it." },
    { q: "How do you make sure the system launches safely?", a: "Every build is scoped to how your business already runs, tested against real enquiries, and goes live in about five weeks with your sign-off at each stage. Nothing is switched on until it behaves the way your office would." },
  ],
  related: [
    { title: "Real Estate", desc: "For the agents booking your team for pre-list repairs & post-close handovers.", href: "/industries/real-estate" },
    { title: "Insurance", desc: "For the brokers routing claims your way — restoration, roofing, plumbing emergencies.", href: "/industries/insurance" },
    { title: "Mortgage & Lending", desc: "For the LOs needing appraisal-flagged repairs done before close.", href: "/industries/mortgage-lending" },
  ],
  close: {
    heading: "Put your office on autopilot.",
    subhead: "One system that replies, qualifies, books, chases & follows up — built around how your business already runs, live in five weeks.",
  },
  schema: {
    serviceType: "Field service & trades business automation",
    areaServed: "United States",
    serviceDescription:
      "An automation layer for trades and home-service businesses that answers inquiries in under a minute, qualifies and books jobs against the live diary, chases quotes, files paperwork and runs customer follow-up — built around the job management system the business already runs.",
    offerDescription: "Plans scoped to job volume and team size, published on the pricing page. Live in about five weeks. No lock-in.",
    breadcrumbName: "Trades & Home Services",
  },
};

// ─────────────────────────────────────────────────────────────────────
// FAMILY LAW & CONSUMER LEGAL  (retargeted to "legal intake software")
// ─────────────────────────────────────────────────────────────────────
export const FAMILY_LAW_STAGE: IndustryStageData = {
  slug: "family-law",
  name: "Family Law & Consumer Legal",
  seo: {
    title: "Legal Intake Software for Law Firms | Rosebud Solutions",
    description:
      "Legal intake that answers in seconds, captures the matter for your conflict-check review, books the consult and writes it into your case management system. It never accepts a matter — that's always the attorney's.",
    ogTitle: "Legal intake software — Rosebud for Family Law & Consumer Legal",
    ogDescription:
      "The layer between a new inquiry and a booked consultation: answers in seconds, captures the matter for conflict review, books the consult and writes the record into Clio, MyCase or your case management system.",
  },
  hero: {
    h1: "Legal intake that turns an inquiry into a booked consult — without touching your judgment",
    intro:
      "The layer between a new inquiry and a booked consultation. It answers in seconds, captures the matter for your conflict-check review, books the consult & writes the record into your case management system. It never accepts a matter — that decision is always the attorney's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "The firm that responds first wins the consult",
    items: [
      { title: "Every inquiry answered in seconds", body: "A family law inquiry lands at an urgent, emotional moment — and it calls the next firm on the list if unanswered. Missed calls get a text back with an intake link; web forms get an immediate answer." },
      { title: "Matter details captured up front", body: "Matter type, opposing party & jurisdiction — captured before the prospect moves on, prepared for your conflict-check review." },
    ],
    scene: { id: "legal-intake", tone: "lilac" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "Structured intake, deliberate lines",
    cards: [
      { tag: "Your rules", tone: "indigo", h3: "Qualification by structured conversation", body: "Matter type, opposing party, jurisdiction & the facts your firm screens on — prepared for review, never run automatically." },
      { tag: "Reaches the attorney", tone: "amber", h3: "Acceptance & anything urgent", body: "Acceptance of representation always reaches the attorney. Matters flagged by your rules route immediately, with full context attached." },
      { tag: "Handled without you", tone: "green", h3: "Routine intake & scheduling", body: "Scheduling, document collection & status updates run without an attorney — so your team's time goes to the matters worth taking." },
    ],
  },
  pullStat: { pre: "It never accepts a matter — ", accent: "that decision is always the attorney's." },
  stage3: {
    index: "03",
    eyebrow: "Your system of record",
    h2: "A complete file, not a half-filled intake form",
    items: [
      { title: "Writes into your case management", body: "Contact, matter, conflict inputs & engagement status synced into the system you already run. Clio is a system we feed, not one we replace." },
      { title: "Priced per plan, not per seat", body: "Scoped to your matter volume & firm size — tiers published on the pricing page, no lock-in, cancel any time." },
    ],
    scene: { id: "legal-record", tone: "peach" },
  },
  boundary: {
    eyebrow: "Where the line is",
    heading: "What stays with you.",
    items: [
      { label: "Legal drafting", body: "petitions, motions, pleadings, settlement positions. Yours." },
      { label: "Conflict checks", body: "we capture the inputs; you run the check." },
      { label: "Legal advice", body: "every client conversation is procedural only; legal questions route to you." },
      { label: "Court filing", body: "we prepare; you file." },
      { label: "Discovery review", body: "we organize; you review." },
      { label: "Emotional counsel", body: "we handle the admin; you handle clients." },
    ],
    note: "Acceptance of representation is always the attorney's decision, never automated. This isn't a limitation — it's the reason the system is safe to deploy in a regulated practice.",
  },
  faqs: [
    { q: "How fast does the system respond to a new inquiry?", a: "In seconds, day or night. Missed calls get a text back with an intake link; web forms and messages get an immediate, procedural reply. The firm that responds first usually wins the consult — this makes sure that's you." },
    { q: "Does the system run conflict checks?", a: "No. It captures the inputs a conflict check needs — opposing party, matter type, jurisdiction — and prepares them for your review. Running the check, and clearing it, is always your firm's." },
    { q: "How does the engagement workflow work once we accept a matter?", a: "Acceptance of representation always reaches the attorney first. Once you accept, routine intake — scheduling, document collection, status updates — runs automatically, with everything written into your case management system." },
    { q: "How does it connect to our case management system?", a: "It writes contact, matter, conflict inputs and engagement status straight into the system you already run — Clio, MyCase, PracticePanther, Smokeball, CosmoLex or Filevine. It's a system we feed, not one we replace." },
    { q: "How are deadlines and scheduling handled?", a: "Consultations are booked against your live calendar, and routine scheduling and reminders run without an attorney. Anything a rule flags as time-sensitive routes to your team immediately with full context." },
    { q: "How is client communication handled without giving legal advice?", a: "Every client conversation is procedural only — intake, scheduling, documents, status. The moment a message turns into a legal question, it routes to you. The system never advises." },
    { q: "Is this designed to operate inside attorney ethics obligations?", a: "Yes. It's built so acceptance of representation, conflict clearance, legal advice and filing all stay with the attorney. The intake layer handles the admin around those decisions, never the decisions themselves." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your matters, courts and rules, tested against real inquiries, and goes live in about five weeks with your sign-off at each stage. Nothing runs on a client until you've approved how it behaves." },
  ],
  related: [
    { title: "Mortgage & Lending", desc: "For loan officers facing title, foreclosure or document-review questions inside live loans.", href: "/industries/mortgage-lending" },
    { title: "Real Estate", desc: "For agents needing transactional support on closings, contract review & title escalations.", href: "/industries/real-estate" },
    { title: "Insurance", desc: "For brokers referring personal-injury & first-party claims work to plaintiff-side attorneys.", href: "/industries/insurance" },
  ],
  close: {
    heading: "See how legal intake runs for your firm.",
    subhead: "Built around your matters, your courts & the case management system you already run — live in five weeks. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Legal intake automation for law firms",
    areaServed: "United States",
    serviceDescription:
      "Legal intake software that answers new inquiries in seconds, captures matter type, opposing party and jurisdiction for the firm's conflict-check review, books the consultation and writes the record into the firm's case management system. Acceptance of representation is always the attorney's decision.",
    offerDescription: "Plans scoped to matter volume and firm size, published on the pricing page. Live in about five weeks. No lock-in, cancel any time.",
    breadcrumbName: "Family Law & Consumer Legal",
  },
};

export const INDUSTRY_STAGE: Record<string, IndustryStageData> = {
  "trades-home-services": TRADES_STAGE,
  "family-law": FAMILY_LAW_STAGE,
};
