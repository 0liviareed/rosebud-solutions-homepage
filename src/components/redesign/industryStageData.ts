/*
 * Data for the staged IndustryStagePage design (Dora "Trades" / "Legal"
 * mockups): hero → 3 stages + pull-stat → optional "what stays with you"
 * boundary → dark FAQ → related → offer CTA.
 *
 * AEO rules baked in (per the site brief):
 *  - Section H2s are buyer questions, each answered in a 40–60 word lead
 *    paragraph (the `answer` field) before the supporting items/cards.
 *  - No named third-party integrations. A named integration is a live-at-install
 *    promise (Operating Model §14); the live list is generic-only here. Pages
 *    say "the system you already run" / "a system we feed, not one we replace".
 *  - No deployment window in public copy (five-weeks etc. is lender-doc only).
 *  - No unprovable / conversion result claims (§6).
 *
 * Copy ships to the `redesign` PREVIEW branch only until Saj + Jay sign off.
 * Scenes: supplied 2× PNGs live in /public/assets/industries/<slug>/ and are
 * wired via `img`; the code-drawn fallback (industryScenes) renders otherwise.
 */

export type StageItem = { title: string; body: string };
export type StageCardTone = "indigo" | "green" | "amber" | "teal";
export type StageCard = { tag: string; tone: StageCardTone; h3: string; body: string };
export type StageScene = { id: string; tone: "lilac" | "peach"; img?: string };
export type StageSplit = { index: string; eyebrow: string; h2: string; answer: string; items: StageItem[]; scene: StageScene };
export type StageCards = { index: string; eyebrow: string; h2: string; answer: string; cards: StageCard[] };
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
// TRADES & HOME SERVICES  (primary: plumbing crm · secondary: HVAC,
// contractor scheduling. Deliberately NOT "field service management" — §4.6.)
// NB: still needs a fuller body-copy retarget pass; metadata + AEO fixed here.
// ─────────────────────────────────────────────────────────────────────
export const TRADES_STAGE: IndustryStageData = {
  slug: "trades-home-services",
  name: "Trades & Home Services",
  seo: {
    title: "Plumbing CRM & Job Intake Automation | Rosebud Solutions",
    description:
      "A plumbing and HVAC CRM layer that answers every inquiry in under a minute, qualifies and books the job against your live diary, chases quotes and runs follow-up — built around the job management system you already run.",
    ogTitle: "Plumbing & HVAC CRM — Rosebud for Trades & Home Services",
    ogDescription:
      "Answer every inquiry in under a minute, book the job against the live diary, chase the quote and follow up — a CRM layer for plumbing, HVAC and contractor teams, built around the system you already run.",
  },
  hero: {
    h1: "Your office runs the business. We run the office.",
    intro:
      "The office admin your plumbing or HVAC team shouldn't be doing — missed calls, qualifying, quote chasing, certificates, follow-up — run by Rosebud around the job-management system you already use. It's the CRM layer that sits in front of the dispatch platform you run, like ServiceTitan, Jobber or Housecall Pro, never another one to replace it.",
  },
  stage1: {
    index: "01",
    eyebrow: "Win the job",
    h2: "How do plumbing and HVAC firms stop losing jobs to missed calls?",
    answer:
      "You answer every enquiry in under a minute, on every channel. The burst-pipe call that rings out at 7am gets a text back with a booking link before the customer dials the next plumber; web forms and WhatsApp get an instant reply. Job type, urgency, access and whether it's a gas job are captured before your office opens the file.",
    items: [
      { title: "Emergency callouts answered first", body: "No heating in January, a burst pipe at 7am — the jobs that decide your week get a reply in seconds, not a voicemail." },
      { title: "Qualified before dispatch", body: "Job type, urgency, access, and whether it's gas-safe work or a two-person lift — captured up front so the right engineer goes to the right job." },
      { title: "Booked against the live diary", body: "Survey and quote slots offered against your real availability, so nobody sends two vans to the same postcode." },
    ],
    scene: { id: "trades-win", tone: "lilac" },
  },
  stage2: {
    index: "02",
    eyebrow: "Run the job",
    h2: "Who chases the quote that decides the job while you're on the tools?",
    answer:
      "Rosebud does, in the background. A £4,000 boiler swap or a re-pipe lives or dies on the follow-up, so every quote is chased on a set cadence, the “let me think about it” is nurtured, and the price objection is handled before it kills the job. Deposit invoices, Gas Safe certificates and sign-offs are collected in the conversation.",
    cards: [
      { tag: "48-hr cadence", tone: "indigo", h3: "Quote follow-up & conversion", body: "The £4k boiler quote run like a sales pipeline — chased, nurtured, and the price objection handled before the customer calls three other firms." },
      { tag: "Filed automatically", tone: "green", h3: "Certificates & paperwork", body: "Gas Safe certificates, deposit invoices, signed quotes and site photos collected in conversation and filed into the job-management system you already run — not chased by email." },
      { tag: "Before it's asked", tone: "amber", h3: "“When's the engineer coming?”", body: "Answered automatically at every stage, so the office phone stops ringing with status chases and only rings for new work." },
    ],
  },
  pullStat: { pre: "Every quote chased on a set cadence — ", accent: "nothing left to the memory of a busy office." },
  stage3: {
    index: "03",
    eyebrow: "Get paid & repeat",
    h2: "How do plumbing and HVAC firms get paid faster and win the repeat work?",
    answer:
      "Invoices go out the moment the job is signed off, with reminders on the cadence that gets them paid. Then every customer is followed up for the annual boiler service, the landlord gas check, the filter change — so the recurring work that fills a quiet week stops depending on someone in the office remembering to call.",
    items: [
      { title: "Invoiced & chased on completion", body: "Invoice out on sign-off, reminders on the cadence that gets you paid — written into the job-management system you already run." },
      { title: "Service reminders & repeat work", body: "Annual boiler services, landlord gas checks and filter changes followed up automatically, so repeat work and referrals stop being accidental." },
    ],
    scene: { id: "trades-paid", tone: "peach" },
  },
  faqs: [
    { q: "Is Rosebud dispatch or field-service management software?", a: "No. Rosebud is the enquiry and CRM layer that sits in front of dispatch platforms like ServiceTitan, Jobber and Housecall Pro. It captures, qualifies, books and chases the work, then writes the job into the job-management system you already run. It feeds your dispatch software; it doesn't replace it." },
    { q: "How fast does Rosebud respond to a new plumbing or HVAC enquiry?", a: "Under 60 seconds, on every channel. The burst-pipe call that rings out at 7am gets a text back with a booking link within seconds; web-form and WhatsApp enquiries get an immediate reply — so the emergency reaches you before the customer dials the next plumber." },
    { q: "How does it qualify a job before it reaches my office?", a: "It captures job type, urgency, access and whether it's gas-safe work in the first exchange, so your office opens a file that's already triaged. Emergency callouts are flagged and time-wasters filtered before anyone on your team picks up." },
    { q: "How does it chase quotes and certificates?", a: "Every quote is chased on the cadence that converts — the follow-up, the “let me think about it” nurture, the price objection handled before it kills the job. Gas Safe certificates, deposit invoices and sign-offs are collected in the conversation, not chased by email." },
    { q: "Does it work with the dispatch software we already run?", a: "Yes. Rosebud is built to sit in front of the job-management system you already run and write jobs into it — your dispatch platform stays the source of truth. It complements the software you use rather than asking you to switch." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to how your business already runs, tested against real enquiries, and goes live with your sign-off at each stage. Nothing is switched on until it behaves the way your office would." },
  ],
  related: [
    { title: "Real Estate", desc: "For the agents booking your team for pre-list repairs & post-close handovers.", href: "/industries/real-estate" },
    { title: "Insurance", desc: "For the brokers routing claims your way — restoration, roofing, plumbing emergencies.", href: "/industries/insurance" },
    { title: "Mortgage & Lending", desc: "For the LOs needing appraisal-flagged repairs done before close.", href: "/industries/mortgage-lending" },
  ],
  close: {
    heading: "Put your office on autopilot.",
    subhead: "One system that replies, qualifies, books, chases & follows up — built around how your business already runs.",
  },
  schema: {
    serviceType: "Job intake automation for plumbing, HVAC & home-service contractors",
    areaServed: "United States",
    serviceDescription:
      "A CRM and enquiry-handling layer for plumbing, HVAC and home-service contractors that answers enquiries in under a minute, qualifies and books jobs against the live diary, chases quotes, collects Gas Safe certificates and runs service follow-up. It sits in front of the dispatch platform the business already runs — ServiceTitan, Jobber or Housecall Pro — and writes into it, rather than replacing it. It is not field-service or dispatch software.",
    offerDescription: "Plans scoped to job volume and team size, published on the pricing page. No lock-in.",
    breadcrumbName: "Trades & Home Services",
  },
};

// ─────────────────────────────────────────────────────────────────────
// FAMILY LAW & CONSUMER LEGAL  (primary: legal intake software)
// ─────────────────────────────────────────────────────────────────────
export const FAMILY_LAW_STAGE: IndustryStageData = {
  slug: "family-law",
  name: "Family Law & Consumer Legal",
  seo: {
    title: "Legal Intake Software for Law Firms | Rosebud Solutions",
    description:
      "Legal intake software that answers in seconds, captures the matter for your conflict-check review, books the consult and writes it into your case management system. It never accepts a matter — that's always the attorney's.",
    ogTitle: "Legal intake software — Rosebud for Family Law & Consumer Legal",
    ogDescription:
      "The layer between a new inquiry and a booked consultation: answers in seconds, captures the matter for conflict review, books the consult and writes the record into the case management system you already run.",
  },
  hero: {
    h1: "Legal intake that turns an inquiry into a booked consult — without touching your judgment",
    intro:
      "The layer between a new inquiry and a booked consultation. It answers in seconds, captures the matter for your conflict-check review, books the consult & writes the record into your case management system. It never accepts a matter — that decision is always the attorney's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "How fast should a law firm respond to a new client inquiry?",
    answer:
      "In seconds, day or night. A family-law inquiry arrives at an urgent, emotional moment and calls the next firm on the list if it goes unanswered. A missed call gets a text back with an intake link, web forms get an immediate reply, and the matter is captured for your conflict-check review.",
    items: [
      { title: "Every inquiry answered in seconds", body: "A family law inquiry lands at an urgent, emotional moment — and it calls the next firm on the list if unanswered. Missed calls get a text back with an intake link; web forms get an immediate answer." },
      { title: "Matter details captured up front", body: "Matter type, opposing party & jurisdiction — captured before the prospect moves on, prepared for your conflict-check review." },
    ],
    scene: { id: "legal-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "How does the system qualify a matter without practicing law?",
    answer:
      "Through structured conversation. It captures matter type, opposing party and jurisdiction — the facts your firm screens on — and prepares them for review, never running a check itself. Acceptance of representation and anything urgent always reach an attorney; routine scheduling and document collection run without one.",
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
    h2: "How does client intake reach our case management system?",
    answer:
      "Contact, matter, conflict inputs and engagement status are written straight into the case management system you already run — not held in a parallel tool. It's a system we feed, not one we replace, so your team opens a complete file rather than a half-filled intake form.",
    items: [
      { title: "Writes into your case management", body: "Contact, matter, conflict inputs & engagement status synced into the case management system you already run. A system we feed, not one we replace." },
      { title: "Priced to your matter volume", body: "Scoped to your matter volume & firm size — tiers published on the pricing page, no lock-in, cancel any time." },
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
    { q: "How does it connect to our case management system?", a: "It writes contact, matter, conflict inputs and engagement status directly into the case management system you already run. Your system stays the source of truth; Rosebud feeds it rather than replacing it." },
    { q: "How are deadlines and scheduling handled?", a: "Consultations are booked against your live calendar, and routine scheduling and reminders run without an attorney. Anything a rule flags as time-sensitive routes to your team immediately with full context." },
    { q: "How is client communication handled without giving legal advice?", a: "Every client conversation is procedural only — intake, scheduling, documents, status. The moment a message turns into a legal question, it routes to you. The system never advises." },
    { q: "Is this designed to operate inside attorney ethics obligations?", a: "Yes. It's built so acceptance of representation, conflict clearance, legal advice and filing all stay with the attorney. The intake layer handles the admin around those decisions, never the decisions themselves." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your matters, courts and rules, tested against real inquiries, and goes live with your sign-off at each stage. Nothing runs on a client until you've approved how it behaves." },
  ],
  related: [
    { title: "Mortgage & Lending", desc: "For loan officers facing title, foreclosure or document-review questions inside live loans.", href: "/industries/mortgage-lending" },
    { title: "Real Estate", desc: "For agents needing transactional support on closings, contract review & title escalations.", href: "/industries/real-estate" },
    { title: "Insurance", desc: "For brokers referring personal-injury & first-party claims work to plaintiff-side attorneys.", href: "/industries/insurance" },
  ],
  close: {
    heading: "See how legal intake runs for your firm.",
    subhead: "Built around your matters, your courts & the case management system you already run. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Legal intake automation for law firms",
    areaServed: "United States",
    serviceDescription:
      "Legal intake software that answers new inquiries in seconds, captures matter type, opposing party and jurisdiction for the firm's conflict-check review, books the consultation and writes the record into the firm's case management system. Acceptance of representation is always the attorney's decision.",
    offerDescription: "Plans scoped to matter volume and firm size, published on the pricing page. No lock-in, cancel any time.",
    breadcrumbName: "Family Law & Consumer Legal",
  },
};

// ─────────────────────────────────────────────────────────────────────
// DENTAL, AESTHETIC & PRIVATE HEALTHCARE  (slug: dental-aesthetic;
// primary: patient intake software)
// ─────────────────────────────────────────────────────────────────────
export const HEALTHCARE_STAGE: IndustryStageData = {
  slug: "dental-aesthetic",
  name: "Dental, Aesthetic & Private Healthcare",
  seo: {
    title: "Patient Intake Software & Dental CRM | Rosebud",
    description:
      "Patient intake that answers in seconds, captures the reason for the visit, books against your live diary and writes the record into your practice management system. It never gives clinical advice — that's always the clinician's.",
    ogTitle: "Patient intake software — Rosebud for Dental, Aesthetic & Private Healthcare",
    ogDescription:
      "The layer between a new patient enquiry and a booked appointment: answers in seconds, captures the reason for the visit, books the appointment and writes the record into the practice management system you already run.",
  },
  hero: {
    h1: "Patient intake that fills the chair — without touching clinical judgment",
    intro:
      "The layer between a new patient enquiry and a booked appointment. It answers in seconds, captures the reason for the visit, books against the live diary & writes the record into your practice management system. It never gives clinical advice — that decision is always the clinician's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & book",
    h2: "How do dental and aesthetic practices stop losing new patients?",
    answer:
      "By answering every enquiry in seconds, day or night. A missed call gets a text back with a booking link; web forms and DMs get an immediate reply. The implant or whitening enquiry books with you before it reaches the practice down the road, with the reason for the visit captured up front.",
    items: [
      { title: "Every enquiry answered in seconds", body: "A missed call gets a text back with a booking link; web forms and DMs get an immediate reply. The implant or whitening enquiry books with you before it books with the practice down the road." },
      { title: "Reason for visit captured up front", body: "Treatment interest, urgency & preferred times — captured before the front desk picks up, so the diary fills with the right appointments." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "How is a patient triaged without giving clinical advice?",
    answer:
      "Through structured conversation against your protocols. Treatment interest, urgency and the questions your front desk screens on are captured and prepared for a person — never a clinical opinion. Anything symptomatic or flagged routes straight to a clinician, while routine booking, recalls and reminders run without the front desk.",
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
    h2: "How does a dental CRM write back into our practice management system?",
    answer:
      "Patient, treatment interest and appointment status are written straight into the practice management system you already run — not a parallel tool. It's a system we feed, not one we replace, so the diary fills with the right appointments and your front desk works from one record.",
    items: [
      { title: "Writes into your practice management", body: "Patient, treatment interest & appointment status synced into the practice management system you already run. A system we feed, not one we replace." },
      { title: "Priced to your patient volume", body: "Scoped to your patient volume & practice size — tiers published on the pricing page, no lock-in, cancel any time." },
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
    { q: "Does it work with our practice management system?", a: "Yes. It writes patient, treatment and appointment records into the practice management system you already run. Your system stays the source of truth; Rosebud feeds it rather than replacing it." },
    { q: "How are recalls, reminders and no-shows handled?", a: "Recalls, reminders and reschedules run automatically on the cadence that keeps the diary full, so the slots and no-shows you write off every week get recovered without the front desk chasing them." },
    { q: "How is patient data handled?", a: "Records are written into your practice management system, not held in a parallel system, and every build is scoped to your privacy obligations. Nothing goes live until your team has signed off how patient data flows." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your practice, tested against real enquiries, and goes live with your sign-off at each stage. Nothing runs on a patient until you've approved how it behaves." },
  ],
  related: [
    { title: "Family Law & Consumer Legal", desc: "The same answer-qualify-book-record system, built for firms taking on new matters.", href: "/industries/family-law" },
    { title: "Insurance", desc: "The same intake layer, built for agencies quoting new business.", href: "/industries/insurance" },
    { title: "Real Estate", desc: "The same intake-to-record system, built for agents working new inquiries.", href: "/industries/real-estate" },
  ],
  close: {
    heading: "Fill the diary without lifting a finger.",
    subhead: "Built around your treatments, your front desk & the practice management system you already run. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Patient intake automation for dental, aesthetic & private healthcare practices",
    areaServed: "United States",
    serviceDescription:
      "Patient intake software that answers new enquiries in seconds, captures the reason for the visit, triages against the practice's protocols, books the appointment and writes the record into the practice management system. Clinical decisions always stay with the clinician.",
    offerDescription: "Plans scoped to patient volume and practice size, published on the pricing page. No lock-in, cancel any time.",
    breadcrumbName: "Dental, Aesthetic & Private Healthcare",
  },
};

// ─────────────────────────────────────────────────────────────────────
// INSURANCE  (primary: insurance agency automation)
// ─────────────────────────────────────────────────────────────────────
export const INSURANCE_STAGE: IndustryStageData = {
  slug: "insurance",
  name: "Insurance",
  seo: {
    title: "Insurance Agency Automation & Lead Intake Software | Rosebud Solutions",
    description:
      "Insurance agency automation that answers every quote request in seconds, captures the risk for your producer's review, books the agent call and writes the record into your agency management system. It never binds coverage — that's the licensed agent's.",
    ogTitle: "Insurance agency automation — Rosebud for Insurance",
    ogDescription:
      "Answer every quote request in seconds, capture the risk details, book the producer call and write the record into the agency management system you already run. It never binds coverage — that's the agent's.",
  },
  hero: {
    h1: "Lead intake that turns a quote request into a booked call — without touching underwriting",
    intro:
      "The layer between a new quote request and a bind-ready file. It answers in seconds, captures the risk details, books the agent call & writes the record into your agency management system. It never binds coverage — that decision is always the licensed agent's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "How fast should an insurance agency respond to a quote request?",
    answer:
      "In seconds. A missed call gets a text back; web forms and comparison-site leads get an immediate reply. The auto or home lead books a producer call with you before it goes cold, with coverage type, effective date and prior carrier captured up front for your team to rate.",
    items: [
      { title: "Every quote request answered in seconds", body: "A missed call gets a text back; web forms and comparison-site leads get an immediate reply. The auto or home lead books with you before it goes cold." },
      { title: "Risk details captured up front", body: "Coverage type, effective date, prior carrier & the details your producers rate on — captured before the lead shops elsewhere." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "How does the system qualify a lead without binding coverage?",
    answer:
      "Through structured conversation against your appetite. Line of business, risk profile and the facts your agency screens on are captured and prepared for a producer — never bound automatically. Bind decisions and complex or high-value risks always reach a licensed agent; document collection and scheduling run without one.",
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
    h2: "How does lead intake reach our agency management system?",
    answer:
      "Contact, risk details and quote status are written straight into the agency management system you already run — not a parallel tool. It's a system we feed, not one we replace, so producers open a complete, bind-ready file instead of a half-filled quote sheet.",
    items: [
      { title: "Writes into your agency management", body: "Contact, risk details & quote status synced into the agency management system you already run. A system we feed, not one we replace." },
      { title: "Priced to your lead volume", body: "Scoped to your lead volume & agency size — tiers published on the pricing page, no lock-in, cancel any time." },
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
    { q: "Does it work with our agency management system?", a: "Yes. It writes contact, risk and quote records into the agency management system you already run. Your system stays the source of truth; Rosebud feeds it rather than replacing it." },
    { q: "How are renewals and follow-up handled?", a: "Renewal reminders, document chase and follow-up run automatically on the cadence that keeps business on the books, so the leads and renewals you'd otherwise drop get recovered." },
    { q: "How is client data and compliance handled?", a: "Records are written into your agency management system, not held in a parallel system, and every producer touch stays with your licensed team. Nothing goes live until your compliance sign-off." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your lines, appetite and rules, tested against real leads, and goes live with your sign-off at each stage. Nothing runs on a client until you've approved it." },
  ],
  related: [
    { title: "Real Estate", desc: "The same intake-to-record system, built for agents working new inquiries.", href: "/industries/real-estate" },
    { title: "Mortgage & Lending", desc: "The same lead layer, built for loan officers chasing rate-sensitive leads.", href: "/industries/mortgage-lending" },
    { title: "Trades & Home Services", desc: "The same answer-qualify-book system, built for the trades.", href: "/industries/trades-home-services" },
  ],
  close: {
    heading: "See how agency intake runs for your book.",
    subhead: "Built around your lines, your appetite & the agency management system you already run. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Insurance agency automation & lead intake",
    areaServed: "United States",
    serviceDescription:
      "Insurance agency automation that answers new quote requests in seconds, captures risk details for the producer's review, books the agent call and writes the record into the agency management system. Binding and coverage advice always stay with a licensed agent.",
    offerDescription: "Plans scoped to lead volume and agency size, published on the pricing page. No lock-in, cancel any time.",
    breadcrumbName: "Insurance",
  },
};

// ─────────────────────────────────────────────────────────────────────
// REAL ESTATE  (primary: real estate transaction management software)
// ─────────────────────────────────────────────────────────────────────
export const REAL_ESTATE_STAGE: IndustryStageData = {
  slug: "real-estate",
  name: "Real Estate",
  seo: {
    title: "Real Estate Transaction Management & Lead Intake Software | Rosebud Solutions",
    description:
      "Real estate transaction management and lead intake that answers every inquiry in seconds, captures the buyer or seller's details, books the showing and writes the record into your CRM. It never negotiates or advises on price — that's the agent's.",
    ogTitle: "Real estate transaction management & lead intake — Rosebud for Real Estate",
    ogDescription:
      "Answer every inquiry in seconds, capture the details, book the showing and keep a worked pipeline with document chase in the CRM you already run. It never negotiates — that's the agent's.",
  },
  hero: {
    h1: "Lead intake that turns an inquiry into a booked showing — without touching your negotiation",
    intro:
      "The layer between a new inquiry and a booked appointment. It answers in seconds, captures the buyer or seller's details, books the showing or listing appointment & writes the record into your CRM. It never negotiates or advises on price — that decision is always the agent's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "How fast should a real estate agent respond to a new lead?",
    answer:
      "In seconds. A missed call gets a text back with a booking link; portal leads get an immediate reply. The buyer books a showing with you before the next agent calls back, with price range, timeline and financing captured up front so the lead is ready to work.",
    items: [
      { title: "Every inquiry answered in seconds", body: "A missed call gets a text back with a booking link; portal leads from Zillow and Realtor.com get an immediate reply. The buyer books a showing with you before the next agent calls back." },
      { title: "Buyer & seller details captured up front", body: "Price range, timeline, financing & area — captured before the lead moves on, ready for you to work." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "How does the system qualify leads without touching the deal?",
    answer:
      "Through structured conversation on your criteria — budget, pre-approval and timeline — prepared for you, never worked automatically. Offers and time-sensitive leads route to you immediately with full context, while showings, long-term nurture and drip follow-up run in the background so cold leads warm themselves.",
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
    h2: "How does lead and transaction data reach our CRM?",
    answer:
      "Contact, criteria, appointment and transaction status are written straight into the CRM you already run — not a parallel tool. It's a system we feed, not one we replace, so document chase and coordination happen against a worked pipeline instead of a folder of loose leads.",
    items: [
      { title: "Writes into your CRM", body: "Contact, criteria, appointment & transaction status synced into the CRM you already run. A system we feed, not one we replace." },
      { title: "Priced to your lead volume", body: "Scoped to your lead volume & team size — tiers published on the pricing page, no lock-in, cancel any time." },
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
    { q: "Does it work with our CRM?", a: "Yes. It writes contact, criteria and appointment records into the CRM you already run. Your system stays the source of truth; Rosebud feeds it rather than replacing it." },
    { q: "How is long-term nurture and follow-up handled?", a: "Cold and not-yet-ready leads run through automatic drip follow-up on the cadence that warms them, so the portal leads you pay for and never reach get recovered and booked." },
    { q: "How is lead data handled?", a: "Records are written into your CRM, not held in a parallel system, and every client relationship stays with the agent. Nothing goes live until your team has signed off how leads flow." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your market, criteria and CRM, tested against real leads, and goes live with your sign-off at each stage. Nothing runs on a lead until you've approved it." },
  ],
  related: [
    { title: "Mortgage & Lending", desc: "The same intake layer, built for loan officers working rate-sensitive leads.", href: "/industries/mortgage-lending" },
    { title: "Insurance", desc: "The same answer-qualify-book system, built for agencies quoting new business.", href: "/industries/insurance" },
    { title: "Trades & Home Services", desc: "The same intake-to-record system, built for the trades booking your repairs.", href: "/industries/trades-home-services" },
  ],
  close: {
    heading: "See how lead intake runs for your pipeline.",
    subhead: "Built around your market, your criteria & the CRM you already run. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Real estate transaction management & lead intake automation",
    areaServed: "United States",
    serviceDescription:
      "Real estate transaction management and lead-intake software that answers new inquiries and portal leads in seconds, captures price range, timeline and financing, books the showing or listing appointment, runs document chase and writes the record into the agent's CRM. Negotiation and pricing advice always stay with the agent.",
    offerDescription: "Plans scoped to lead volume and team size, published on the pricing page. No lock-in, cancel any time.",
    breadcrumbName: "Real Estate",
  },
};

// ─────────────────────────────────────────────────────────────────────
// MORTGAGE & LENDING  (primary: mortgage crm)
// ─────────────────────────────────────────────────────────────────────
export const MORTGAGE_STAGE: IndustryStageData = {
  slug: "mortgage-lending",
  name: "Mortgage & Lending",
  seo: {
    title: "Mortgage CRM & Loan Intake Software | Rosebud Solutions",
    description:
      "A mortgage CRM and loan-intake layer that answers every inquiry in seconds, captures the borrower's details, books the loan officer call and writes the record into your LOS or CRM. It never makes a credit decision — that's the loan officer's.",
    ogTitle: "Mortgage CRM & loan intake — Rosebud for Mortgage & Lending",
    ogDescription:
      "Answer every inquiry in seconds, capture the borrower's details, book the LO call and write the record into the LOS or CRM you already run. It never makes a credit decision — that's the loan officer's.",
  },
  hero: {
    h1: "Loan intake that turns an inquiry into a booked call — without touching a credit decision",
    intro:
      "The layer between a new inquiry and a booked loan consult. It answers in seconds, captures the borrower's details, books the LO call & writes the record into your LOS or CRM. It never makes a credit decision or gives loan advice — that decision is always the loan officer's.",
  },
  stage1: {
    index: "01",
    eyebrow: "Answer & capture",
    h2: "How fast should a lender respond to a new mortgage inquiry?",
    answer:
      "In seconds. A missed call gets a text back; web and portal leads get an immediate reply. The refinance or purchase lead books a call with you before rates move them elsewhere, with loan purpose, price range and timeline captured up front for your loan officers to work.",
    items: [
      { title: "Every inquiry answered in seconds", body: "A missed call gets a text back; web and portal leads get an immediate reply. The refinance or purchase lead books with you before rates move them elsewhere." },
      { title: "Borrower details captured up front", body: "Loan purpose, price range, timeline & the details your LOs work on — captured before the lead shops rates elsewhere." },
    ],
    scene: { id: "generic-intake", tone: "lilac", img: "scene-01.png" },
  },
  stage2: {
    index: "02",
    eyebrow: "Qualify & route",
    h2: "How does the system qualify a borrower without a credit decision?",
    answer:
      "Through structured conversation on your overlays — loan purpose and rough profile — prepared for a loan officer, never decided automatically. Credit and approval conversations always reach a licensed LO; rate-sensitive leads route immediately, while document collection and scheduling run without one.",
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
    h2: "How does loan intake reach our LOS or CRM?",
    answer:
      "Contact, loan details and status are written straight into the LOS or CRM you already run — not a parallel tool. It's a system we feed, not one we replace, so your team opens a complete file instead of a half-filled application.",
    items: [
      { title: "Writes into your LOS or CRM", body: "Contact, loan details & status synced into the LOS or CRM you already run. A system we feed, not one we replace." },
      { title: "Priced to your lead volume", body: "Scoped to your lead volume & team size — tiers published on the pricing page, no lock-in, cancel any time." },
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
    { q: "Does it work with our LOS or CRM?", a: "Yes. It writes contact, loan and status records into the LOS or CRM you already run. Your system stays the source of truth; Rosebud feeds it rather than replacing it." },
    { q: "How is document collection and follow-up handled?", a: "Doc chase, scheduling and status updates run automatically on the cadence that moves files forward, so the leads you pay for and never call back get recovered and booked." },
    { q: "How is borrower data and compliance handled?", a: "Records are written into your LOS or CRM, not held in a parallel system, and every LO touch stays with your licensed team. Nothing goes live until your compliance sign-off." },
    { q: "How do you make sure it launches safely?", a: "Every build is scoped to your products, overlays and rules, tested against real leads, and goes live with your sign-off at each stage. Nothing runs on a borrower until you've approved it." },
  ],
  related: [
    { title: "Real Estate", desc: "The same intake layer, built for agents working new inquiries.", href: "/industries/real-estate" },
    { title: "Insurance", desc: "The same answer-qualify-book system, built for agencies quoting new business.", href: "/industries/insurance" },
    { title: "Family Law & Consumer Legal", desc: "The same intake-to-record system, built for firms taking on new matters.", href: "/industries/family-law" },
  ],
  close: {
    heading: "See how loan intake runs for your pipeline.",
    subhead: "Built around your products, your overlays & the LOS or CRM you already run. Plans & pricing on the page.",
  },
  schema: {
    serviceType: "Mortgage CRM & loan intake automation",
    areaServed: "United States",
    serviceDescription:
      "A mortgage CRM and loan-intake layer that answers new inquiries in seconds, captures loan purpose and borrower details for the loan officer's review, books the consult and writes the record into the lender's LOS or CRM. Credit decisions and loan advice always stay with a licensed loan officer.",
    offerDescription: "Plans scoped to lead volume and team size, published on the pricing page. No lock-in, cancel any time.",
    breadcrumbName: "Mortgage & Lending",
  },
};

export const INDUSTRY_STAGE: Record<string, IndustryStageData> = {
  "trades-home-services": TRADES_STAGE,
  "family-law": FAMILY_LAW_STAGE,
  "dental-aesthetic": HEALTHCARE_STAGE,
  insurance: INSURANCE_STAGE,
  "real-estate": REAL_ESTATE_STAGE,
  "mortgage-lending": MORTGAGE_STAGE,
};
