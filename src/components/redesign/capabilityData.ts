// Data for the /capabilities/[slug] template (design: "Capture Page"). Sections
// 00 switcher, 05 voices, 06 close chrome are identical across every capability;
// 01–04 are per-capability content.

export type DeepBlock = { num: string; kicker: string; title: string; body: string };
export type WorksPanelText = { head: string; body: string };
export type CapabilityData = {
  slug: string;
  name: string;
  accent: string; // hero/deep-dive mock tint
  hero: { headlinePre: string; headlineEm: string; subhead: string };
  works: { headlinePre: string; headlineEm: string; panels?: string[]; panelsText?: WorksPanelText[] };
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
export const LIVE_SLUGS = new Set(["capture", "qualify", "book", "retain", "reactivate", "follow-through"]);

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
    slug: "capture", name: "Capture", accent: "#8B7DD8",
    hero: {
      headlinePre: "Inbound enquiries answered & logged in seconds. On every channel. At every ",
      headlineEm: "hour",
      subhead: "The moment someone reaches out via web form, WhatsApp, SMS, email, or social, the system executes a programmed response and writes the record straight to your CRM. No manual triage delays, no out-of-hours gaps.",
    },
    works: {
      headlinePre: "The intake layer, running as ", headlineEm: "one automated event",
      panels: ["/assets/works-panel-1.png", "/assets/works-panel-2.png", "/assets/works-panel-3.png"],
    },
    integrationsSub: "Capture writes straight into the CRM, calendar, and messaging tools your team already lives in, with no new dashboard to learn.",
    deep: [
      { num: "01", kicker: "Listen", title: "Continuous intake listener", body: "After-hours enquiries are the ones a staffed team structurally cannot catch: the 9pm web form, the Sunday WhatsApp. The intake layer runs on a continuous listener, not a shift, so an out-of-hours submission triggers the same response-and-log sequence as a midday one. The demand you paid for at midnight is processed at midnight, not queued for Monday." },
      { num: "02", kicker: "Bind", title: "Zero-latency response binding", body: "An enquiry that waits five minutes has already begun looking elsewhere. Capture and response are bound into a single event on the same trigger, so there is no triage queue to sit in. The reply fires on intake, generated against your brand voice, tone, and positioning rules. Sub-second response, in the voice of your best operator. First to respond enters the conversation first." },
      { num: "03", kicker: "Record", title: "Structured record at source", body: "Every enquiry is written as a structured record at the moment of contact: contact, channel origin, source, and the ad click identifier where the lead came from paid media. That normalised record is the single object every downstream workflow reads from, so qualification, booking, reactivation, and attribution all build on the same clean foundation." },
    ],
    close: { heading: "Ready to stabilise your front office?", subhead: "We deploy, manage, and monitor the entire intake layer for you as an operated rental service, connecting directly to your existing CRM and calendars. The system handles the workflow up to the booking using your exact tone; your team closes the sale." },
  },

  qualify: {
    slug: "qualify", name: "Qualify", accent: "#6B5CC4",
    hero: {
      headlinePre: "Inbound enquiries scored against your criteria & routed three ways", headlineEm: "",
      subhead: "Your specific definition of a good lead is held as configurable data rather than hard-coded software logic. Each record is evaluated automatically on arrival: qualified enquiries transition to booking, cases requiring human professional judgement escalate instantly, and records that do not qualify take the disposition you set at onboarding, whether that is a nurture track, a suppression flag, or a clean drop. An expected value attaches at the point of qualification.",
    },
    works: {
      headlinePre: "Your operational rules running as ", headlineEm: "live logic",
      panelsText: [
        { head: "Configurable condition sets", body: "Budget, scope, location & fit criteria are stored as structured parameters, meaning your definition of a good lead is refined via settings rather than code rebuilds." },
        { head: "Three-way outcome routing", body: "Every processed enquiry exits through one of three predefined tracks: direct calendar routing, immediate human escalation, or the not-qualified disposition you set at onboarding." },
        { head: "Expected value mapping", body: "The value tiers established at onboarding attach an estimated financial weight to the data record the moment it qualifies, prior to human contact." },
      ],
    },
    integrationsSub: "Qualify parses records against rules held in your configuration spine & writes the tier verdict, validation data & expected value straight into your CRM",
    deep: [
      { num: "01", kicker: "Evaluate", title: "Runtime evaluation engine", body: "A baseline lead definition cannot be templated, which is why your specific operational rules are held as data rather than code. Conditions are evaluated at runtime against every incoming record, allowing you to tighten your qualification criteria via your control panel the week you discover a pipeline leak, without engineering delays." },
      { num: "02", kicker: "Escalate", title: "Human-in-the-loop escalation", body: "Matters requiring professional governance or specialised licenses route to your staff immediately. Escalation parameters fire instantly on matching entries, pushing the record to a designated team member while logging the handover as an auditable compliance log." },
      { num: "03", kicker: "Tiers", title: "Expected value assignment", body: "The platform maps a financial estimate to a record the moment it passes your logic checks, allowing downstream media tracking & pipeline forecasting to read value from the earliest touch. Identifying unqualified records is handled with the same accuracy, keeping your advertising optimisation loop clean." },
    ],
    close: { heading: "Ready to isolate the enquiries worth your time?", subhead: "We deploy, manage & monitor the qualification pipeline for you as an operated rental service that hooks into your current CRM. The system filters and structures every lead up to the booking using your rules; your team closes the sale." },
  },

  book: {
    slug: "book", name: "Book", accent: "#3B9EFF",
    hero: {
      headlinePre: "Validated leads routed directly into your diary at the moment of intent", headlineEm: "",
      subhead: "The pipeline queries your calendar in real time to reserve appointments against actual availability, applying your operational slot limits and travel buffers. The slot is secured within the active conversation thread while the lead is engaged, replicating your exact brand tone, rather than proposed via email delays.",
    },
    works: {
      headlinePre: "Real-time availability booked as ", headlineEm: "one motion",
      panelsText: [
        { head: "Direct calendar sync", body: "The system connects directly to your Google Calendar, Outlook, Calendly or Cal.com infrastructure, reading true availability instead of an exported copy." },
        { head: "Operational buffer logic", body: "Appointment durations, preparation windows & daily caps are mapped to your specifications, filling your diary exactly how your business operates." },
        { head: "Sub-second slot reservation", body: "The chosen appointment time is locked instantly on selection, updating the workflow state & writing the timestamp to the central customer file." },
      ],
    },
    integrationsSub: "Book polls live availability from your team's production calendars, locks the slot & writes the confirmed appointment back into your diary & CRM",
    deep: [
      { num: "01", kicker: "Live", title: "Real-time thread booking", body: "Standard flows propose static times and wait for a response, introducing a delay where intent drops off. The system checks live availability mid-conversation and logs the booking before the lead exits the thread, securing the commitment at the peak of intent." },
      { num: "02", kicker: "Buffers", title: "Custom operational constraints", body: "Production capacity varies by industry; a clinical space, a site survey & a corporate consult require different rules. Durations, notice requirements & daily limits map to your constraints, ensuring the appointments generated match what your staff can work." },
      { num: "03", kicker: "Logs", title: "State transitions & timestamping", body: "A booking is a data transition rather than a text confirmation. The lead record updates, a permanent timestamp is written, and the calendar invite maps to the original source file, giving downstream tracking an accurate, unedited starting log." },
    ],
    close: { heading: "Ready to fill your calendar without the manual tracking?", subhead: "We deploy, manage & monitor the booking engine for you as an operated rental service that integrates with your production systems. The platform coordinates the schedule up to the booking; your team handles the closing meeting." },
  },

  retain: {
    slug: "retain", name: "Retain", accent: "#2E9E5B",
    hero: {
      headlinePre: "Every appointment confirmed, reminded & kept", headlineEm: "",
      subhead: "An automated multi-channel sequence initiates the moment an appointment is logged, operating across SMS, WhatsApp & email using your business's voice. Reschedule requests and cancellations are processed through your calendar rules automatically, and any slot that frees up is backfilled from your waiting list in priority order, holding your diary structure together without manual re-entry.",
    },
    works: {
      headlinePre: "The automated sequence that insulates ", headlineEm: "your diary",
      panelsText: [
        { head: "Scheduled multi-channel touches", body: "Confirmation & reminder steps are locked to the appointment log and delivered across the specific channels your prospects already check." },
        { head: "Day-before verification logic", body: "The final verification message operates on separate, specialised rules configured to your brand voice, designed specifically to lock in attendance." },
        { head: "No-show, reschedule & backfill", body: "Missed slots switch the record to a recovery state instantly, inbound change requests are parsed and rebooked against current availability, and the vacated time is offered to your waiting list in priority order." },
      ],
    },
    integrationsSub: "Retain coordinates communication across your clients' preferred messaging channels & syncs every confirmation, cancellation, backfill & change back to your calendar & CRM",
    deep: [
      { num: "01", kicker: "Automatic", title: "Event-triggered communication", body: "The reminder sequence is tied directly to the calendar state change, not a manual list update. Every confirmed appointment enters the matching cadence automatically, meaning attendance management scales alongside your diary volume without taxing administrative staff." },
      { num: "02", kicker: "Verify", title: "Day-before verification guardrails", body: "The message sent the day before determines attendance. Its timing, channel constraints & content run on separate rules tailored to match your precise brand guidelines, focusing entirely on making the appointment frictionless to keep." },
      { num: "03", kicker: "Recover", title: "No-show recovery & priority backfill", body: "An unkept appointment is lost revenue, and recovering it is revenue the business had already earned once. When a slot is missed or released, the engine shifts that record into a recovery track to secure a new time rather than letting the lead exit the pipeline, and simultaneously offers the vacated slot to your waiting list in priority order. One cancellation resolves as two bookings held rather than one hour lost." },
    ],
    close: { heading: "Ready to protect the bookings you already have?", subhead: "We deploy, manage & monitor the retention layer for you as an operated rental service, mapping directly to your calendars & messaging tools. The platform automates reminders and updates up to the appointment; your team handles the revenue conversation." },
  },

  reactivate: {
    slug: "reactivate", name: "Reactivate", accent: "#C77DFF",
    hero: {
      headlinePre: "Dormant records re-engaged on a per-lead cadence until they ", headlineEm: "convert",
      subhead: "Leads that went cold, prospects who were not ready, and customers due for recall are queried out of your database and loaded into re-engagement. A state engine tracks each record individually and decides the correct touch at the correct time across email, SMS & WhatsApp. Anyone who responds re-enters qualification automatically.",
    },
    works: {
      headlinePre: "Paid-for demand, worked as ", headlineEm: "live state",
      panelsText: [
        { head: "Dormant cohort querying", body: "Cold records, paused prospects & customers due for recall are surfaced against your dormancy and recall rules, then loaded into a re-engagement sequence." },
        { head: "Per-lead state tracking", body: "Each record carries its own state, so the engine decides the correct touch at the correct time for that lead rather than pushing everyone through an identical timer." },
        { head: "Automatic requalification", body: "A response flips the record to active and returns it to the qualification layer, where it is re-scored and re-valued before routing to booking." },
      ],
    },
    integrationsSub: "Reactivate queries dormant records straight from your CRM, runs re-engagement through the channels your clients already use & writes every state change back",
    deep: [
      { num: "01", kicker: "Query", title: "Dormant cohort querying", body: "Most of a pipeline is not lost, it is dormant. The enquiries that were never wrong, only early, sit in the CRM in volumes no team can work by hand. The system queries those records against dormancy and recall rules, then loads the matching cohort into a re-engagement sequence, so the acquisition cost already spent is not written off to a stale database." },
      { num: "02", kicker: "State", title: "Per-lead state engine", body: "A broadcast sends everyone the same message on the same timer. This does not. Every record carries its own state, and the engine reads that state to decide which touch that specific lead should receive and when, across email, SMS & WhatsApp. Delivery is decoupled from anyone's workload, so nothing is missed because the week got busy, and no lead is treated as a member of a batch." },
      { num: "03", kicker: "Requalify", title: "Response-triggered requalification", body: "Reactivation is a state transition, not a campaign. A response flips the dormant record back to active, re-enters it into the qualification engine, re-scores it against your current rules & re-attaches an expected value before routing it toward a booking. Revival and requalification are a single automated motion, not a hand-off." },
    ],
    close: { heading: "Ready to work the pipeline you have already paid for?", subhead: "We deploy, manage & monitor the re-engagement layer for you as an operated rental service that hooks into your current CRM & messaging channels. The system works dormant demand up to the booking using your tone; your team closes the sale." },
  },

  "follow-through": {
    slug: "follow-through", name: "Follow through", accent: "#E8814A",
    hero: {
      headlinePre: "Document collection, updates, quotes & invoices driven to completion", headlineEm: "",
      subhead: "Four workflow modules deploy on a single architecture, activated where your operations require them: file collection, stakeholder status updates, pipeline quote management & payment chasing with aged-debtor flags. It is configuration rather than a custom build, allowing disparate industries to share the same horizontal engine.",
    },
    works: {
      headlinePre: "Four operational modules running on ", headlineEm: "one engine",
      panelsText: [
        { head: "Settings-based activation", body: "Individual modules are enabled based on your specific operational workflow, utilising pre-built pipelines with zero custom engineering." },
        { head: "Persistent follow-up logic", body: "Outbound requests run on programmatic sequences matching your brand tone until the file is received, the quote is decided, or the invoice clears. Inbound replies are detected and returned into the sequence, so a response redirects the chase instead of being talked over." },
        { head: "Aged-debtor monitoring", body: "Unpaid invoices are tracked continuously against system age boundaries, triggering escalation steps before balances turn into bad debt." },
      ],
    },
    integrationsSub: "Follow through drops received files, contract decisions & verified payments directly into your project management & accounting tools",
    deep: [
      { num: "01", kicker: "Modular", title: "Infrastructure-level configuration", body: "The four operational modules are settings adjustments on a horizontal spine, not bespoke software builds. A professional firm activates document collection while a service company enables payment routing; both run on the identical infrastructure layer." },
      { num: "02", kicker: "Paperwork", title: "Document chasing & status management", body: "Administrative bottlenecks occur when paperwork sits with clients and stakeholders are left uninformed. Automated chasers run until files are uploaded directly into your record system, while milestones trigger status updates using your brand voice. Reply detection reads what comes back and returns it into the sequence, so a client answering a question is handled rather than chased again, and anything genuinely needing a person is routed to your staff." },
      { num: "03", kicker: "AR", title: "Quote collection & receivable flows", body: "Proposals and invoices require tracking to a definitive choice. Quote tracking runs persistent touchpoints until a choice is logged, while invoicing tracks outstanding records, reminds on a set schedule & surfaces collection flags as accounts age." },
    ],
    close: { heading: "Ready to remove administrative chasing from your workload?", subhead: "We deploy, manage & monitor the follow-through layer for you as an operated rental service, anchoring into your CRM & accounting packages. The platform processes documents, quotes, status alerts & invoices to resolution; your team makes the business decisions." },
  },
};
