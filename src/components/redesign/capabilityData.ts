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
  deepCtas?: { label: string; href: string }[]; // per-page override for the deep-dive CTAs
  close: { heading: string; subhead: string };
};

// Deep-dive CTAs by block position (consistent across every capability).
export const DEEP_CTAS = [
  { label: "See plans & pricing", href: "/pricing" },
  { label: "Book a consultation", href: "https://cal.eu/rosebudsolutions/demo" },
  { label: "Get your price", href: "/pricing" },
];

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
export const LIVE_SLUGS = new Set(["capture", "qualify", "book", "retain", "reactivate", "follow-through", "closed-loop-attribution"]);

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
  { head: "Pricing", desc: "Explore plans that work for you", href: "/pricing" },
  { head: "About", desc: "The company behind the system", href: "/about" },
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
      headlinePre: "Answer every enquiry in seconds & catch leads before they go elsewhere", headlineEm: "",
      subhead: "Stop losing enquiries to slow replies. The second someone messages you through your website, WhatsApp, SMS, email or social, the platform answers in your brand voice and writes the lead straight into your CRM. No queue, no opening hours, nobody dropping what they are doing to reply.",
    },
    works: {
      headlinePre: "Catch every lead the moment it lands", headlineEm: "",
      panelsText: [
        { head: "One inbox for every channel", body: "Web forms, WhatsApp, SMS, email & social messages all arrive in one place as a single lead record." },
        { head: "Instant replies in your voice", body: "Every enquiry gets an immediate answer matched to your tone and positioning, so it never reads like an autoresponder." },
        { head: "A full record from the first touch", body: "Captures the contact, the channel, the source & the ad click that brought them, the second the enquiry arrives." },
      ],
    },
    integrationsSub: "Capture writes new leads straight into the CRM, calendar & messaging tools your team already uses, with no new dashboard to learn",
    deep: [
      { num: "01", kicker: "Listen", title: "Always-on lead capture", body: "The 9pm web form and the Sunday WhatsApp are the enquiries a staffed team can never catch. The platform does not work shifts, so a message at midnight gets the same instant answer as one at midday. You stop paying for leads that go cold overnight." },
      { num: "02", kicker: "Bind", title: "Instant branded replies", body: "A lead who waits five minutes has already messaged someone else. Answering and capturing happen as one event, so there is no queue for the enquiry to sit in, and the message that goes back sounds like your best operator rather than a generic bot. First to reply usually wins the job." },
      { num: "03", kicker: "Record", title: "Clean data from the start", body: "Every enquiry becomes a proper record the second it arrives, holding the contact, the channel, where they came from & the ad they clicked. Everything that happens next, from qualifying to booking to your reporting, builds on that one clean file." },
    ],
    close: { heading: "Ready to answer every enquiry the moment it lands?", subhead: "We deploy, manage & monitor the intake layer for you as an operated rental service that connects to your current CRM & calendars. The platform answers and logs every enquiry up to the booking using your tone; your team closes the sale." },
  },

  qualify: {
    slug: "qualify", name: "Qualify", accent: "#6B5CC4",
    hero: {
      headlinePre: "Automatically filter out bad leads & only talk to the ones that matter", headlineEm: "",
      subhead: "Stop wasting time on bad data. The platform checks every new enquiry against your operational rules the second it arrives. High-value leads go straight to your calendar, urgent cases jump to your team, and the rest are dropped, nurtured, or suppressed exactly how you want.",
    },
    works: {
      headlinePre: "Spend your days talking to real customers", headlineEm: "",
      panelsText: [
        { head: "Set your own filters", body: "Choose what makes a lead perfect for your business, from budget gaps to specific locations, and update them whenever you want." },
        { head: "Route leads three ways", body: "Send good leads straight to booking, hand off emergency issues to a team member, or filter out poor fits instantly." },
        { head: "Know what every lead is worth", body: "The system tags an estimated value to each enquiry on day one, before anyone on your team lifts a finger." },
      ],
    },
    integrationsSub: "Qualify checks leads against your rules & writes the fit verdict, qualifying notes & estimated value straight into the CRM you already use",
    deep: [
      { num: "01", kicker: "Evaluate", title: "Smart lead filtering", body: "You cannot use a generic template to define a good customer. You set the criteria at onboarding, and the system runs them against every incoming message. Change your rules in seconds through your dashboard whenever your pipeline needs a change, without any coding." },
      { num: "02", kicker: "Escalate", title: "Instant human alerts", body: "Some enquiries cannot wait for an automation loop. When a high-priority issue or a complex file arrives, the system breaks the automation chain and alerts a specific person on your team instantly, keeping a permanent log of the handoff." },
      { num: "03", kicker: "Tiers", title: "An estimated value on every lead", body: "Every qualified lead gets an estimated financial tier the moment it passes your rules, so you can see what your pipeline is worth before anyone has spoken to it. If you add closed-loop attribution, that same verdict is what gets sent back to your advertising." },
    ],
    close: { heading: "Ready to isolate the enquiries worth your time?", subhead: "We deploy, manage & monitor the qualification pipeline for you as an operated rental service that hooks into your current CRM. The system filters and structures every lead up to the booking using your rules; your team closes the sale." },
  },

  book: {
    slug: "book", name: "Book", accent: "#3B9EFF",
    hero: {
      headlinePre: "Book qualified leads into your diary at the peak of their intent", headlineEm: "",
      subhead: "Stop losing leads to slow callbacks. The platform links directly to your calendar to spot real openings, handles the chat using your brand voice, and books the appointment while the lead is active and paying attention.",
    },
    works: {
      headlinePre: "Real-time availability booked as one motion", headlineEm: "",
      panelsText: [
        { head: "Direct calendar link", body: "Connects to Google, Outlook, Calendly or Cal.com to read actual availability, never an outdated copy." },
        { head: "Dynamic travel & prep buffers", body: "Add automated padding for travel times, prep windows & daily booking caps so your team is never overwhelmed." },
        { head: "Instant spot locking", body: "Secures the slot the moment a lead picks it, changes their pipeline status & stamps the confirmation time." },
      ],
    },
    integrationsSub: "Book polls live openings from your team's existing calendars, locks the slot & writes the confirmed appointment back into your diary & CRM",
    deep: [
      { num: "01", kicker: "Live", title: "Chat thread booking", body: "Sending an email with suggested times creates gaps where leads wander off. The platform reads your diary mid-chat and locks in the spot before the user exits the thread, catching them when they are most ready to buy." },
      { num: "02", kicker: "Buffers", title: "Custom schedule rules", body: "A site visit, a medical appointment & a finance consult all take different time blocks. We map out your exact time rules, prep buffers & notice windows at onboarding so your diary fills exactly how your business actually runs." },
      { num: "03", kicker: "Logs", title: "Clean pipeline updates", body: "A booking is a data shift, not just a chat message. The system updates the customer record, stamps the time, and links the appointment back to the enquiry that created it, so your reporting reads what actually happened rather than somebody's memory of it." },
    ],
    close: { heading: "Ready to fill your calendar without the manual tracking?", subhead: "We deploy, manage & monitor the booking engine for you as an operated rental service that integrates with your production systems. The platform coordinates the schedule up to the booking; your team handles the closing meeting." },
  },

  retain: {
    slug: "retain", name: "Retain", accent: "#2E9E5B",
    hero: {
      headlinePre: "Protect your schedule & keep more of the appointments you book", headlineEm: "",
      subhead: "Stop losing revenue to empty seats. The platform kicks off an automated reminder chain over WhatsApp, SMS & email using your exact brand tone the moment a slot is booked. It automatically handles changes and rebooks cancellations without you touching a thing.",
    },
    works: {
      headlinePre: "The automated sequence that insulates your diary", headlineEm: "",
      panelsText: [
        { head: "Timed multi-channel alerts", body: "Sends confirmations & reminders at perfect intervals on the text and email channels your prospects check most." },
        { head: "Day-before verification", body: "Fires a custom verification message the day before the meeting using your voice, built purely to make sure they show up." },
        { head: "Smart no-show recovery", body: "A missed meeting flips the record into recovery, and the system reaches out to rebook using your live calendar openings." },
      ],
    },
    integrationsSub: "Retain coordinates reminders across your clients' preferred messaging apps & updates every cancellation or shift inside your CRM",
    deep: [
      { num: "01", kicker: "Automatic", title: "Instant event triggers", body: "The reminder chain starts the moment the calendar updates, not when a human remembers to copy a name over. This means your client protection scales effortlessly as your diary fills up, with zero extra admin work." },
      { num: "02", kicker: "Verify", title: "High-intent confirmations", body: "The text sent the day before determines attendance. We separate this alert from standard reminders, matching your exact brand tone to make it incredibly simple for the customer to confirm, change, or clear their time." },
      { num: "03", kicker: "Recover", title: "Rebook missed meetings", body: "A missed appointment is wasted marketing spend. If someone doesn't show, the system instantly drops them into a friendly recovery path to lock in a new time slot automatically, salvaging the lead before it goes cold." },
    ],
    close: { heading: "Ready to protect the bookings you already have?", subhead: "We deploy, manage & monitor the retention layer for you as an operated rental service, mapping directly to your calendars & messaging tools. The platform automates reminders and updates up to the appointment; your team handles the revenue conversation." },
  },

  reactivate: {
    slug: "reactivate", name: "Reactivate", accent: "#C77DFF",
    hero: {
      headlinePre: "Turn the leads you gave up on into booked appointments", headlineEm: "",
      subhead: "Stop writing off leads that never actually said no. The platform works your cold enquiries, the ones who were not ready yet, and past customers due a check-in, sending the right message at the right time over email, SMS & WhatsApp until they come back to you.",
    },
    works: {
      headlinePre: "The pipeline you already paid for, working again", headlineEm: "",
      panelsText: [
        { head: "Find your dormant leads", body: "Pulls cold enquiries, paused prospects & customers due a recall out of your CRM automatically, against your own rules for what counts as cold." },
        { head: "The right message at the right time", body: "Every lead is tracked on its own, so the system picks the next message for that person rather than blasting the whole list on the same day." },
        { head: "Straight back into qualifying", body: "When someone replies, they go back through your rules, get a fresh value, and head for your calendar like a brand new lead." },
      ],
    },
    integrationsSub: "Reactivate pulls dormant leads straight from your CRM, works them across the channels your customers actually use & writes every response back",
    deep: [
      { num: "01", kicker: "Query", title: "Find the leads sitting idle", body: "Most of your pipeline is not lost, it is just sitting there. The enquiries that were never wrong, only early, pile up in your CRM in numbers no team could ever work by hand. The platform finds them against your own rules and puts them back into play, so the money you already spent winning them is not written off to a stale database." },
      { num: "02", kicker: "State", title: "One sequence per lead", body: "A mass email sends everybody the same thing on the same day. This does not. Every lead is tracked individually, so the system knows exactly which message that person should get and when, across email, SMS & WhatsApp. Nothing gets missed because the week got busy." },
      { num: "03", kicker: "Requalify", title: "A reply puts them back in play", body: "When a dormant lead answers, they do not land in an inbox for somebody to deal with later. They go straight back through your qualifying rules, pick up a fresh estimated value, and move toward your calendar like any new enquiry. Waking them up and qualifying them is one motion, not a handover." },
    ],
    close: { heading: "Ready to work the pipeline you already paid for?", subhead: "We deploy, manage & monitor the re-engagement layer for you as an operated rental service that hooks into your current CRM & messaging channels. The platform works your dormant leads up to the booking using your tone; your team closes the sale." },
  },

  "follow-through": {
    slug: "follow-through", name: "Follow through", accent: "#E8814A",
    hero: {
      headlinePre: "Drive files, updates, quotes & invoices to completion", headlineEm: "",
      subhead: "Clear the paperwork bottleneck off your desk. Turn on the exact modules your business needs: chase missing customer documents, send automated project updates, track sent quotes to a firm yes, or follow up on unpaid invoices until they clear.",
    },
    works: {
      headlinePre: "Four operational modules running on one engine", headlineEm: "",
      panelsText: [
        { head: "Switch on what you need", body: "Enable individual modules based on your exact workflow gaps, with zero custom software development or code required." },
        { head: "Friendly, persistent chasing", body: "Sends clear follow-ups using your brand voice until the file is uploaded, the quote is signed, or the money hits your account." },
        { head: "Flag late payments early", body: "Tracks outstanding cash balances dynamically and flags late accounts before they turn into permanent bad business debt." },
      ],
    },
    integrationsSub: "Follow through drops received documents, client decisions & payment status directly into the CRM your team already uses",
    deep: [
      { num: "01", kicker: "Modular", title: "Ready-made business modules", body: "These modules run on one unified backbone, not distinct custom builds. A law firm can use it to gather ID files while a trade business uses it to chase invoices; both switch them on via settings changes, keeping deployment fast." },
      { num: "02", kicker: "Paperwork", title: "Clear files & client updates", body: "Projects slow down when you are waiting on client files or handling endless “where is my update” calls. The platform checks in automatically until documents are sent, files them against the right record, and keeps clients updated in your brand voice." },
      { num: "03", kicker: "AR", title: "Quote tracking & payment collection", body: "Every proposal and invoice needs an absolute answer. The platform tracks sent quotes until the client hits accept or decline, and handles invoice reminders seamlessly, removing the awkward cash conversations you hate starting." },
    ],
    close: { heading: "Ready to remove administrative chasing from your workload?", subhead: "We deploy, manage & monitor the follow-through layer for you as an operated rental service, anchoring into the CRM you already use. The platform processes documents, quotes, status alerts & invoices to resolution; your team makes the business decisions." },
  },

  "closed-loop-attribution": {
    slug: "closed-loop-attribution", name: "Closed-loop attribution", accent: "#8B7DD8",
    hero: {
      headlinePre: "Show Google which ads bring real customers & let it find you ", headlineEm: "more",
      subhead: "Your ad account cannot tell a buyer from a browser. It sees a form submitted, so it goes and buys more forms. Because Rosebud handles the enquiry from first message to booked appointment, we know which ones were real, and we send that verdict back against the exact click that produced it. Your bidding stops optimising for web forms and starts optimising for booked business.",
    },
    works: {
      headlinePre: "Bid on booked business, not web forms", headlineEm: "",
      panelsText: [
        { head: "One record, click to booking", body: "The click ID lands with the enquiry and stays on the record while Rosebud works it, so the ad that produced a customer is never in question." },
        { head: "First-party outcomes only", body: "Every outcome we send back was generated on your own site, under your own consent. Nothing sourced, nothing inferred, nothing modelled." },
        { head: "Your media team stays in control", body: "We produce the file and hand it over. They run the uploads, they own campaign performance, and we never touch your ad account." },
      ],
    },
    integrationsSub: "Closed-loop attribution matches qualified outcomes to the original Google click & hands your media team a file that is ready to upload",
    deepCtas: [
      { label: "Get started", href: "/pricing" },
      { label: "Get started", href: "/pricing" },
      { label: "Get started", href: "/pricing" },
    ],
    deep: [
      { num: "01", kicker: "Match", title: "Tie every lead to its click", body: "When somebody clicks your ad, Google tags the visit with an ID. Rosebud saves it the second they message you and keeps it on the record while the lead is worked, so the ad and keyword behind a customer are never a guess.\n\nMost attribution breaks in four places, and all four are handled here. Consent rejections strip the ID. Redirects and mobile form builders drop it. Phone enquiries never carry one at all. And a lead that arrives on one device and books on another looks like two people.\n\nThe ID is captured in a hidden field on your own form as the enquiry is submitted, with a tracking number doing the same job for calls. Contact details are hashed before any matching happens, so the link holds even where the ID goes missing." },
      { num: "02", kicker: "Tag", title: "Tell it which leads were any good", body: "Google knows a form was filled in. It cannot tell a serious buyer from a time-waster, so it optimises for the only thing it can see and buys you more forms.\n\nRosebud already scored that lead against your rules while working it, so the answer is on the record before anyone asks for it. That verdict is what goes back: this one qualified, that one did not. Where your CRM reports a closed deal back to us, the real figure replaces the estimate on the record.\n\nYou do not need a revenue number to start. Teaching the bidding the difference between a good lead and a bad one is the gain, and it works from the first upload." },
      { num: "03", kicker: "Deliver", title: "First-party data, handed to your media team", body: "Every record we send was generated by a real person on your own site, with consent recorded against it. Nothing bought, nothing scraped, nothing modelled to fill a gap. That is the difference between data an ad platform can learn from and data that gets an account suspended.\n\nWe format it to Google's own specification and deliver on a set schedule to whoever runs your media. They handle the uploads and own campaign performance. We never log into your ad tools." },
    ],
    close: { heading: "Ready to spend on customers instead of clicks?", subhead: "Closed-loop attribution runs on top of the Rosebud system, because the outcome it sends back is produced by the system working the lead. It earns its place when you are running Google lead generation at volume, roughly thirty to fifty conversions per campaign per month, on your own site with consent on your forms. Below that, the gain is marginal and we will tell you so on the call rather than sell it to you." },
  },
};
