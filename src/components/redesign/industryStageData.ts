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
    scene: { id: "legal-intake", tone: "lilac", img: "scene-01.png" },
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
    scene: { id: "legal-record", tone: "peach", img: "scene-02.png" },
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

// ─────────────────────────────────────────────────────────────────────
// DENTAL, AESTHETIC & PRIVATE HEALTHCARE  (slug: healthcare)
// ─────────────────────────────────────────────────────────────────────
export const HEALTHCARE_STAGE: IndustryStageData = {
  slug: "healthcare",
  name: "Dental, Aesthetic & Private Healthcare",
  seo: {
    title: "Patient Intake Software for Dental & Aesthetic Practices | Rosebud Solutions",
    description:
      "Patient intake that answers in seconds, captures the reason for the visit, books against your live diary and writes the record into your practice management system. It never gives clinical advice — that's always the clinician's.",
    ogTitle: "Patient intake software — Rosebud for Dental, Aesthetic & Private Healthcare",
    ogDescription:
      "The layer between a new patient enquiry and a booked appointment: answers in seconds, captures the reason for the visit, books the appointment and writes the record into Dentally, Cliniko or your PMS.",
  },
  hero: {
    h1: "Patient intake that fills the chair — without touching clinical judgment",
    intro:
      "The layer between a new patient enquiry and a booked appointment. It answers in seconds, captures the reason for the visit, books against the live diary & writes the record into your practice management system. It never gives clinical advice — that decision is always the clinician's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & book",
    h2: "The practice that answers first books the patient",
    items: [
      { title: "Every enquiry answered in seconds", body: "A missed call gets a text back with a booking link; web forms and DMs get an immediate reply. The implant or whitening enquiry books with you before it books with the practice down the road." },
      { title: "Reason for visit captured up front", body: "Treatment interest, urgency & preferred times — captured before the front desk picks up, so the diary fills with the right appointments." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "Structured triage, clinical lines held",
    cards: [
      { tag: "Your protocols", tone: "indigo", h3: "Triage by structured conversation", body: "Treatment type, urgency & the questions your practice screens on — prepared for the front desk, never a clinical opinion." },
      { tag: "Reaches the clinician", tone: "amber", h3: "Symptoms & anything clinical", body: "Symptoms, medical-history flags & anything needing a clinician's eye route straight to your team, with full context attached." },
      { tag: "Handled without you", tone: "green", h3: "Scheduling, recalls & reminders", body: "Booking, reschedules, recalls & pre-appointment paperwork run without the front desk lifting a finger." },
    ],
  },
  pullStat: { pre: "The no-shows and empty slots you write off every week — ", accent: "recovered." },
  stage3: {
    index: "03",
    eyebrow: "Your system of record",
    h2: "A filled diary, written into the software you already run",
    items: [
      { title: "Writes into your practice management", body: "Patient, treatment interest & appointment status synced into Dentally, SOE, Cliniko or your PMS. A system we feed, not one we replace." },
      { title: "Priced per plan, not per seat", body: "Scoped to your patient volume & practice size — tiers published on the pricing page, no lock-in, cancel any time." },
    ],
    scene: { id: "generic-record", tone: "peach", img: "scene-02.png" },
  },
  boundary: {
    eyebrow: "Where the line is",
    heading: "What stays with you.",
    items: [
      { label: "Clinical judgment", body: "diagnosis, treatment planning, anything requiring a clinician. Yours." },
      { label: "Medical advice", body: "every patient conversation is administrative only; clinical questions route to you." },
      { label: "Consent & records", body: "we prepare the admin; you obtain consent and hold the record." },
      { label: "Prescribing", body: "never automated, always the clinician's." },
      { label: "Triage decisions", body: "we capture symptoms; you decide urgency." },
      { label: "Duty of care", body: "we handle the admin; you handle patients." },
    ],
    note: "Clinical decisions are always the clinician's, never automated. This isn't a limitation — it's the reason the system is safe to run in a regulated practice.",
  },
  faqs: [
    { q: "How fast does the system respond to a new enquiry?", a: "In seconds, day or night. A missed call gets a text back with a booking link; web forms and DMs get an immediate, administrative reply. The practice that answers first usually books the patient — this makes sure that's you." },
    { q: "Does the system give clinical or medical advice?", a: "No. Every patient conversation is administrative only — treatment interest, scheduling, paperwork. The moment a message turns clinical, it routes to your team. The system never advises." },
    { q: "How does it handle urgent or symptomatic enquiries?", a: "Anything symptomatic or flagged by your protocols is passed straight to a clinician with full context, rather than booked automatically. You decide urgency; the system just makes sure nothing is missed." },
    { q: "Which practice management systems do you connect to?", a: "It writes patient, treatment and appointment records into the system you already run — Dentally, SOE, Cliniko and the rest. Rosebud feeds your PMS; it doesn't replace it." },
    { q: "How are recalls, reminders and no-shows handled?", a: "Recalls, reminders and reschedules run automatically on the cadence that keeps the diary full, so the slots and no-shows you write off every week get recovered without the front desk chasing them." },
    { q: "How is patient data handled?", a: "Records are written into your PMS, not held in a parallel system, and every build is scoped to your privacy obligations. Nothing goes live until your team has signed off how patient data flows." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your practice, tested against real enquiries, and goes live in about five weeks with your sign-off at each stage. Nothing runs on a patient until you've approved how it behaves." },
  ],
  related: [
    { title: "Family Law & Consumer Legal", desc: "The same answer-qualify-book-record system, built for firms taking on new matters.", href: "/industries/family-law" },
    { title: "Insurance", desc: "The same intake layer, built for agencies quoting new business.", href: "/industries/insurance" },
    { title: "Real Estate", desc: "The same front-office system, built for agents working new inquiries.", href: "/industries/real-estate" },
  ],
  close: {
    heading: "Fill the diary without lifting a finger.",
    subhead: "Built around your treatments, your front desk & the practice management system you already run — live in five weeks. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Patient intake automation for dental, aesthetic & private healthcare practices",
    areaServed: "United States",
    serviceDescription:
      "Patient intake software that answers new enquiries in seconds, captures the reason for the visit, triages against the practice's protocols, books the appointment and writes the record into the practice management system. Clinical decisions always stay with the clinician.",
    offerDescription: "Plans scoped to patient volume and practice size, published on the pricing page. Live in about five weeks. No lock-in, cancel any time.",
    breadcrumbName: "Dental, Aesthetic & Private Healthcare",
  },
};

// ─────────────────────────────────────────────────────────────────────
// INSURANCE  (slug: insurance)
// ─────────────────────────────────────────────────────────────────────
export const INSURANCE_STAGE: IndustryStageData = {
  slug: "insurance",
  name: "Insurance",
  seo: {
    title: "Insurance Lead Management & Intake Software | Rosebud Solutions",
    description:
      "Insurance intake that answers in seconds, captures the risk, books the agent call and writes the record into your agency management system. It never binds coverage — that decision is always the licensed agent's.",
    ogTitle: "Insurance lead management — Rosebud for Insurance Agencies",
    ogDescription:
      "The layer between a new quote request and a bind-ready file: answers in seconds, captures the risk details, books the producer call and writes the record into AMS360, Applied Epic or HawkSoft.",
  },
  hero: {
    h1: "Lead intake that turns a quote request into a booked call — without touching underwriting",
    intro:
      "The layer between a new quote request and a bind-ready file. It answers in seconds, captures the risk details, books the agent call & writes the record into your agency management system. It never binds coverage — that decision is always the licensed agent's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "The agency that responds first writes the policy",
    items: [
      { title: "Every quote request answered in seconds", body: "A missed call gets a text back; web forms and comparison-site leads get an immediate reply. The auto or home lead books with you before it goes cold." },
      { title: "Risk details captured up front", body: "Coverage type, effective date, prior carrier & the details your producers rate on — captured before the lead shops elsewhere." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "Structured intake, licensed lines held",
    cards: [
      { tag: "Your appetite", tone: "indigo", h3: "Qualification by structured conversation", body: "Line of business, risk profile & the facts your agency screens on — prepared for the producer, never bound automatically." },
      { tag: "Reaches the agent", tone: "amber", h3: "Binding & anything complex", body: "Bind decisions always reach a licensed agent. Complex or high-value risks route immediately, with full context attached." },
      { tag: "Handled without you", tone: "green", h3: "Documents & scheduling", body: "Document collection, scheduling & status updates run without a producer — so their time goes to quotes worth writing." },
    ],
  },
  pullStat: { pre: "The leads you pay for and never call back — ", accent: "recovered and booked." },
  stage3: {
    index: "03",
    eyebrow: "Your system of record",
    h2: "A complete file, not a half-filled quote sheet",
    items: [
      { title: "Writes into your agency management", body: "Contact, risk details & quote status synced into AMS360, Applied Epic, HawkSoft or your system. A system we feed, not one we replace." },
      { title: "Priced per plan, not per seat", body: "Scoped to your lead volume & agency size — tiers published on the pricing page, no lock-in, cancel any time." },
    ],
    scene: { id: "generic-record", tone: "peach", img: "scene-02.png" },
  },
  boundary: {
    eyebrow: "Where the line is",
    heading: "What stays with you.",
    items: [
      { label: "Binding coverage", body: "never automated, always a licensed agent's." },
      { label: "Underwriting & rating", body: "we capture the inputs; you rate and bind." },
      { label: "Coverage advice", body: "every conversation is procedural; coverage questions route to you." },
      { label: "Claims decisions", body: "we intake; you and the carrier decide." },
      { label: "Compliance & licensing", body: "every producer touch stays with your licensed team." },
      { label: "Client relationships", body: "we handle the admin; you handle clients." },
    ],
    note: "Binding and coverage advice are always a licensed agent's, never automated. This isn't a limitation — it's the reason the system is safe to run in a licensed agency.",
  },
  faqs: [
    { q: "How fast does the system respond to a new quote request?", a: "In seconds, day or night. A missed call gets a text back; web forms and comparison-site leads get an immediate reply. The agency that responds first usually writes the policy — this makes sure that's you." },
    { q: "Does the system bind coverage or give coverage advice?", a: "No. It captures the risk details a quote needs and books the producer call. Binding, rating and coverage advice always stay with a licensed agent — the system never advises or binds." },
    { q: "How are complex or high-value risks handled?", a: "Anything your appetite flags as complex or high-value routes straight to a licensed agent with full context, rather than being quoted automatically. You decide what to write." },
    { q: "Which agency management systems do you connect to?", a: "It writes contact, risk and quote records into the system you already run — AMS360, Applied Epic, HawkSoft and the rest. Rosebud feeds your AMS; it doesn't replace it." },
    { q: "How are renewals and follow-up handled?", a: "Renewal reminders, document chase and follow-up run automatically on the cadence that keeps business on the books, so the leads and renewals you'd otherwise drop get recovered." },
    { q: "How is client data and compliance handled?", a: "Records are written into your AMS, not held in a parallel system, and every producer touch stays with your licensed team. Nothing goes live until your compliance sign-off." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your lines, appetite and rules, tested against real leads, and goes live in about five weeks with your sign-off at each stage. Nothing runs on a client until you've approved it." },
  ],
  related: [
    { title: "Real Estate", desc: "The same intake-to-record system, built for agents working new inquiries.", href: "/industries/real-estate" },
    { title: "Mortgage & Lending", desc: "The same lead layer, built for loan officers chasing rate-sensitive leads.", href: "/industries/mortgage-lending" },
    { title: "Trades & Home Services", desc: "The same answer-qualify-book system, built for the trades.", href: "/industries/trades-home-services" },
  ],
  close: {
    heading: "See how agency intake runs for your book.",
    subhead: "Built around your lines, your appetite & the agency management system you already run — live in five weeks. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Insurance lead intake automation for agencies",
    areaServed: "United States",
    serviceDescription:
      "Insurance lead-management software that answers new quote requests in seconds, captures risk details for the producer's review, books the agent call and writes the record into the agency management system. Binding and coverage advice always stay with a licensed agent.",
    offerDescription: "Plans scoped to lead volume and agency size, published on the pricing page. Live in about five weeks. No lock-in, cancel any time.",
    breadcrumbName: "Insurance",
  },
};

// ─────────────────────────────────────────────────────────────────────
// REAL ESTATE  (slug: real-estate)
// ─────────────────────────────────────────────────────────────────────
export const REAL_ESTATE_STAGE: IndustryStageData = {
  slug: "real-estate",
  name: "Real Estate",
  seo: {
    title: "Real Estate Lead Management & Intake Software | Rosebud Solutions",
    description:
      "Real estate intake that answers in seconds, captures the buyer or seller's details, books the showing and writes the record into your CRM. It never negotiates or advises on price — that's always the agent's.",
    ogTitle: "Real estate lead management — Rosebud for Real Estate",
    ogDescription:
      "The layer between a new inquiry and a booked appointment: answers portal leads in seconds, captures price range and timeline, books the showing and writes the record into Follow Up Boss, kvCORE or your CRM.",
  },
  hero: {
    h1: "Lead intake that turns an inquiry into a booked showing — without touching your negotiation",
    intro:
      "The layer between a new inquiry and a booked appointment. It answers in seconds, captures the buyer or seller's details, books the showing or listing appointment & writes the record into your CRM. It never negotiates or advises on price — that decision is always the agent's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "The agent who replies first gets the appointment",
    items: [
      { title: "Every inquiry answered in seconds", body: "A missed call gets a text back with a booking link; portal leads from Zillow and Realtor.com get an immediate reply. The buyer books a showing with you before the next agent calls back." },
      { title: "Buyer & seller details captured up front", body: "Price range, timeline, financing & area — captured before the lead moves on, ready for you to work." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "Structured intake, the deal work kept yours",
    cards: [
      { tag: "Your criteria", tone: "indigo", h3: "Qualification by structured conversation", body: "Budget, pre-approval, timeline & the facts you work leads on — prepared for you, never worked automatically." },
      { tag: "Reaches the agent", tone: "amber", h3: "Offers & anything time-sensitive", body: "Offer conversations & hot leads route to you immediately, with full context attached." },
      { tag: "Handled without you", tone: "green", h3: "Showings, follow-up & nurture", body: "Scheduling, long-term nurture & drip follow-up run without you lifting a finger — so cold leads warm themselves." },
    ],
  },
  pullStat: { pre: "The portal leads you pay for and never reach — ", accent: "recovered and booked." },
  stage3: {
    index: "03",
    eyebrow: "Your system of record",
    h2: "A worked pipeline, written into the CRM you already run",
    items: [
      { title: "Writes into your CRM", body: "Contact, criteria & appointment status synced into Follow Up Boss, kvCORE, Sierra Interactive or your CRM. A system we feed, not one we replace." },
      { title: "Priced per plan, not per seat", body: "Scoped to your lead volume & team size — tiers published on the pricing page, no lock-in, cancel any time." },
    ],
    scene: { id: "generic-record", tone: "peach", img: "scene-02.png" },
  },
  boundary: {
    eyebrow: "Where the line is",
    heading: "What stays with you.",
    items: [
      { label: "Negotiation", body: "offers, counteroffers, strategy. Yours." },
      { label: "Pricing advice", body: "we capture interest; you advise on price." },
      { label: "Fiduciary duty", body: "every client relationship stays with the agent." },
      { label: "Showings & representation", body: "we book; you show and represent." },
      { label: "Contracts", body: "we prepare the inputs; you and your broker execute." },
      { label: "Client relationships", body: "we handle the admin; you handle clients." },
    ],
    note: "Negotiation and advice are always the agent's, never automated. This isn't a limitation — it's the line that keeps the system safe under your brokerage.",
  },
  faqs: [
    { q: "How fast does the system respond to a new inquiry?", a: "In seconds, day or night. A missed call gets a text back with a booking link; portal leads get an immediate reply. The agent who replies first usually gets the appointment — this makes sure that's you." },
    { q: "Does the system negotiate or advise on price?", a: "No. Every conversation is procedural — qualifying, scheduling, follow-up. Offers, counteroffers and pricing advice always stay with the agent. The system never negotiates or advises." },
    { q: "How are hot or time-sensitive leads handled?", a: "Anything that looks ready to transact or move on an offer routes to you immediately with full context, rather than sitting in a nurture sequence. You work the deal; the system works the pipeline." },
    { q: "Which CRMs do you connect to?", a: "It writes contact, criteria and appointment records into the CRM you already run — Follow Up Boss, kvCORE, Sierra Interactive and the rest. Rosebud feeds your CRM; it doesn't replace it." },
    { q: "How is long-term nurture and follow-up handled?", a: "Cold and not-yet-ready leads run through automatic drip follow-up on the cadence that warms them, so the portal leads you pay for and never reach get recovered and booked." },
    { q: "How is lead data handled?", a: "Records are written into your CRM, not held in a parallel system, and every client relationship stays with the agent. Nothing goes live until your team has signed off how leads flow." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your market, criteria and CRM, tested against real leads, and goes live in about five weeks with your sign-off at each stage. Nothing runs on a lead until you've approved it." },
  ],
  related: [
    { title: "Mortgage & Lending", desc: "The same intake layer, built for loan officers working rate-sensitive leads.", href: "/industries/mortgage-lending" },
    { title: "Insurance", desc: "The same answer-qualify-book system, built for agencies quoting new business.", href: "/industries/insurance" },
    { title: "Trades & Home Services", desc: "The same front-office system, built for the trades booking your repairs.", href: "/industries/trades-home-services" },
  ],
  close: {
    heading: "See how lead intake runs for your pipeline.",
    subhead: "Built around your market, your criteria & the CRM you already run — live in five weeks. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Real estate lead intake automation",
    areaServed: "United States",
    serviceDescription:
      "Real estate lead-management software that answers new inquiries and portal leads in seconds, captures price range, timeline and financing, books the showing or listing appointment and writes the record into the agent's CRM. Negotiation and pricing advice always stay with the agent.",
    offerDescription: "Plans scoped to lead volume and team size, published on the pricing page. Live in about five weeks. No lock-in, cancel any time.",
    breadcrumbName: "Real Estate",
  },
};

// ─────────────────────────────────────────────────────────────────────
// MORTGAGE & LENDING  (slug: mortgage-lending)
// ─────────────────────────────────────────────────────────────────────
export const MORTGAGE_STAGE: IndustryStageData = {
  slug: "mortgage-lending",
  name: "Mortgage & Lending",
  seo: {
    title: "Mortgage Lead Management & Intake Software | Rosebud Solutions",
    description:
      "Mortgage intake that answers in seconds, captures the borrower's details, books the loan officer call and writes the record into your LOS or CRM. It never makes a credit decision — that's always the loan officer's.",
    ogTitle: "Mortgage lead management — Rosebud for Mortgage & Lending",
    ogDescription:
      "The layer between a new inquiry and a booked loan consult: answers in seconds, captures loan purpose and timeline, books the LO call and writes the record into Encompass, Arive or your CRM.",
  },
  hero: {
    h1: "Loan intake that turns an inquiry into a booked call — without touching a credit decision",
    intro:
      "The layer between a new inquiry and a booked loan consult. It answers in seconds, captures the borrower's details, books the LO call & writes the record into your LOS or CRM. It never makes a credit decision or gives loan advice — that decision is always the loan officer's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "The lender who responds first funds the loan",
    items: [
      { title: "Every inquiry answered in seconds", body: "A missed call gets a text back; web and portal leads get an immediate reply. The refinance or purchase lead books with you before rates move them elsewhere." },
      { title: "Borrower details captured up front", body: "Loan purpose, price range, timeline & the details your LOs work on — captured before the lead shops rates elsewhere." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "Structured intake, the credit call kept yours",
    cards: [
      { tag: "Your overlays", tone: "indigo", h3: "Qualification by structured conversation", body: "Loan purpose, rough profile & the facts your team pre-screens on — prepared for the LO, never decided automatically." },
      { tag: "Reaches the loan officer", tone: "amber", h3: "Approvals & anything time-sensitive", body: "Credit and approval conversations always reach a licensed LO. Rate-sensitive leads route immediately, with full context attached." },
      { tag: "Handled without you", tone: "green", h3: "Document collection & scheduling", body: "Doc chase, scheduling & status updates run without an LO — so their time goes to loans worth closing." },
    ],
  },
  pullStat: { pre: "The leads you pay for and never call back — ", accent: "recovered and booked." },
  stage3: {
    index: "03",
    eyebrow: "Your system of record",
    h2: "A complete file, not a half-filled application",
    items: [
      { title: "Writes into your LOS or CRM", body: "Contact, loan details & status synced into Encompass, Arive or your CRM. A system we feed, not one we replace." },
      { title: "Priced per plan, not per seat", body: "Scoped to your lead volume & team size — tiers published on the pricing page, no lock-in, cancel any time." },
    ],
    scene: { id: "generic-record", tone: "peach", img: "scene-02.png" },
  },
  boundary: {
    eyebrow: "Where the line is",
    heading: "What stays with you.",
    items: [
      { label: "Credit decisions", body: "approvals, denials, conditions. Never automated, always the LO's." },
      { label: "Loan advice", body: "every conversation is procedural; loan questions route to you." },
      { label: "Rate locks & disclosures", body: "we prepare; you and compliance execute." },
      { label: "Underwriting", body: "we intake; you and the underwriter decide." },
      { label: "Licensing & compliance", body: "every LO touch stays with your licensed team." },
      { label: "Borrower relationships", body: "we handle the admin; you handle borrowers." },
    ],
    note: "Credit decisions and loan advice are always a licensed LO's, never automated. This isn't a limitation — it's the reason the system is safe under a lender's compliance obligations.",
  },
  faqs: [
    { q: "How fast does the system respond to a new inquiry?", a: "In seconds, day or night. A missed call gets a text back; web and portal leads get an immediate reply. The lender who responds first usually funds the loan — this makes sure that's you." },
    { q: "Does the system make credit decisions or give loan advice?", a: "No. It captures loan purpose and borrower details and books the LO call. Credit decisions, approvals and loan advice always stay with a licensed loan officer — the system never advises or decides." },
    { q: "How are rate-sensitive or time-critical leads handled?", a: "Anything rate-sensitive or ready to move routes straight to a licensed LO with full context, rather than sitting in a queue. You make the credit call; the system makes sure the lead reaches you first." },
    { q: "Which LOS or CRM do you connect to?", a: "It writes contact, loan and status records into the system you already run — Encompass, Arive and the rest. Rosebud feeds your LOS or CRM; it doesn't replace it." },
    { q: "How is document collection and follow-up handled?", a: "Doc chase, scheduling and status updates run automatically on the cadence that moves files forward, so the leads you pay for and never call back get recovered and booked." },
    { q: "How is borrower data and compliance handled?", a: "Records are written into your LOS or CRM, not held in a parallel system, and every LO touch stays with your licensed team. Nothing goes live until your compliance sign-off." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your products, overlays and rules, tested against real leads, and goes live in about five weeks with your sign-off at each stage. Nothing runs on a borrower until you've approved it." },
  ],
  related: [
    { title: "Real Estate", desc: "The same intake layer, built for agents working new inquiries.", href: "/industries/real-estate" },
    { title: "Insurance", desc: "The same answer-qualify-book system, built for agencies quoting new business.", href: "/industries/insurance" },
    { title: "Family Law & Consumer Legal", desc: "The same intake-to-record system, built for firms taking on new matters.", href: "/industries/family-law" },
  ],
  close: {
    heading: "See how loan intake runs for your pipeline.",
    subhead: "Built around your products, your overlays & the LOS or CRM you already run — live in five weeks. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Mortgage lead intake automation for lenders",
    areaServed: "United States",
    serviceDescription:
      "Mortgage lead-management software that answers new inquiries in seconds, captures loan purpose and borrower details for the loan officer's review, books the consult and writes the record into the lender's LOS or CRM. Credit decisions and loan advice always stay with a licensed loan officer.",
    offerDescription: "Plans scoped to lead volume and team size, published on the pricing page. Live in about five weeks. No lock-in, cancel any time.",
    breadcrumbName: "Mortgage & Lending",
  },
};

export const INDUSTRY_STAGE: Record<string, IndustryStageData> = {
  "trades-home-services": TRADES_STAGE,
  "family-law": FAMILY_LAW_STAGE,
  healthcare: HEALTHCARE_STAGE,
  insurance: INSURANCE_STAGE,
  "real-estate": REAL_ESTATE_STAGE,
  "mortgage-lending": MORTGAGE_STAGE,
};
