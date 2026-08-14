// Data for the /resources library (index) and /resources/[slug] (article)
// templates. Add an entry to RESOURCES to publish it — the index page,
// filters, tallies and sort all update themselves off this one array.
// `stage` must match a key in STAGES, `sector` a key in SECTORS, `kind` a
// key in KINDS. Stage keys mirror the capability slugs in capabilityData.ts
// so the same taxonomy is used site-wide.

// Paragraph/list/callout/quote text supports **bold** inline markup, parsed
// at render time — keeps authoring close to the source markdown rather than
// needing a separate rich-text schema.
export type ResourceBody =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "list"; ordered?: boolean; items: { lead?: string; text: string }[] }
  | { type: "callout"; lines: string[] }
  | { type: "quote"; text: string }
  | { type: "stat-row"; stats: { value: string; label: string }[] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "related"; items: { href: string; title: string; desc?: string }[] }
  | { type: "cta-download"; heading: string; body: string; buttonLabel: string; resourceKey: string }
  | { type: "table"; head: string[]; rows: (string | number)[][]; totalRow?: (string | number)[] }
  | { type: "bar-chart"; title: string; caption: string; unit?: "%"; bars: { label: string; value: number; lead?: boolean; muted?: boolean }[] };

export type ResourceItem = {
  slug: string;
  title: string;
  dek: string;
  stage: string;
  sector: string;
  kind: string;
  mins: number;
  date: string; // ISO yyyy-mm-dd
  author?: { name: string; role: string };
  toc?: { id: string; label: string }[];
  featured?: boolean;
  // Additional JSON-LD graph nodes (e.g. ScholarlyArticle, Dataset,
  // Organization) merged alongside the auto-generated FAQPage schema —
  // see src/app/resources/[slug]/page.tsx.
  extraSchema?: Record<string, unknown>[];
  // Full article body — placeholder until real copy is supplied.
  body: ResourceBody[];
};

export const STAGES: { key: string; name: string }[] = [
  { key: "capture", name: "Capture" },
  { key: "qualify", name: "Qualify" },
  { key: "book", name: "Book" },
  { key: "retain", name: "Retain" },
  { key: "reactivate", name: "Reactivate" },
  { key: "follow-through", name: "Follow through" },
  { key: "closed-loop-attribution", name: "Attribution" },
];

export const SECTORS: { key: string; name: string }[] = [
  { key: "all", name: "Every sector" },
  { key: "trades", name: "Trades" },
  { key: "dental", name: "Dental & aesthetics" },
  { key: "law", name: "Family law" },
  { key: "mortgage", name: "Mortgage & lending" },
  { key: "cleaning", name: "Commercial cleaning" },
];

export const KINDS: { key: string; name: string }[] = [
  { key: "guide", name: "Guide" },
  { key: "template", name: "Template" },
  { key: "checklist", name: "Checklist" },
  { key: "study", name: "Research" },
];

export const SORTS: { key: string; label: string; fn: (a: ResourceItem, b: ResourceItem) => number }[] = [
  { key: "new", label: "Newest first", fn: (a, b) => b.date.localeCompare(a.date) },
  { key: "old", label: "Oldest first", fn: (a, b) => a.date.localeCompare(b.date) },
  { key: "short", label: "Quickest read", fn: (a, b) => a.mins - b.mins || a.title.localeCompare(b.title) },
  { key: "az", label: "A to Z", fn: (a, b) => a.title.localeCompare(b.title) },
];

export const nameOf = (list: { key: string; name: string }[], key: string) =>
  list.find((x) => x.key === key)?.name ?? key;

// ── Published resources ──────────────────────────────────────────────────
// PLACEHOLDER: article body below is a stand-in structure awaiting the real
// write-up (findings, methodology, numbers) — swap the `body` array once
// copy is ready. Title/dek/mins/date are also placeholders pending sign-off.
export const RESOURCES: Record<string, ResourceItem> = {
  "2026-us-service-business-response-study": {
    slug: "2026-us-service-business-response-study",
    title: "The 2026 US Service Business Response Study",
    dek: "We sent a real enquiry to 273 US service businesses. 20.5% had no working web enquiry form. Of the 211 that were delivered, 70.1% were never answered.",
    stage: "capture",
    sector: "all",
    kind: "study",
    mins: 14,
    date: "2026-08-13",
    author: { name: "Sajni Okojie", role: "Chief Operating Officer, Rosebud Global Ltd" },
    featured: true,
    toc: [
      { id: "summary", label: "Summary" },
      { id: "why-this-study-exists", label: "Why this study exists" },
      { id: "method", label: "Method" },
      { id: "finding-1", label: "Finding 1 · One in five had no web form" },
      { id: "finding-2", label: "Finding 2 · Seven in ten never answered" },
      { id: "takeaways", label: "Key takeaways" },
      { id: "limitations", label: "Limitations" },
      { id: "data-availability", label: "Data availability" },
      { id: "sector-findings", label: "Sector findings" },
      { id: "citation", label: "Citation" },
    ],
    extraSchema: [
      {
        "@type": "ScholarlyArticle",
        "@id": "https://rosebud.global/resources/2026-us-service-business-response-study#article",
        url: "https://rosebud.global/resources/2026-us-service-business-response-study",
        name: "The 2026 US Service Business Response Study",
        headline: "What happens when you send a US service business a web enquiry",
        alternateName: "US Service Business Response Study 2026",
        description: "Primary research across 273 US owner-operated service businesses in commercial cleaning, dental and aesthetics, family law, mortgage and lending, and trades. 20.5% had no working web enquiry form. Of 211 enquiries provably delivered, 29.9% received any reply within 72 hours and 21.3% received a reply from a person. 70.1% received no response of any kind.",
        inLanguage: "en",
        datePublished: "2026-08-13",
        dateModified: "2026-08-13",
        isAccessibleForFree: true,
        author: { "@type": "Person", name: "Sajni Okojie", jobTitle: "Chief Operating Officer", affiliation: { "@id": "https://rosebud.global/resources/2026-us-service-business-response-study#organization" } },
        publisher: { "@id": "https://rosebud.global/resources/2026-us-service-business-response-study#organization" },
        about: [
          { "@type": "Thing", name: "Lead response time" },
          { "@type": "Thing", name: "Enquiry handling" },
          { "@type": "Thing", name: "Service business operations" },
        ],
        keywords: "lead response time statistics, speed to lead statistics, lead response time study, web enquiry form, service business response rate",
        citation: { "@type": "Dataset", "@id": "https://rosebud.global/resources/2026-us-service-business-response-study#dataset" },
        mainEntityOfPage: "https://rosebud.global/resources/2026-us-service-business-response-study",
        version: "2026.1",
        license: "https://creativecommons.org/licenses/by/4.0/",
        subjectOf: [
          { "@type": "WebPage", url: "https://rosebud.global/industries/dental-aesthetic" },
          { "@type": "WebPage", url: "https://rosebud.global/industries/family-law" },
          { "@type": "WebPage", url: "https://rosebud.global/industries/mortgage-lending" },
          { "@type": "WebPage", url: "https://rosebud.global/industries/commercial-cleaning" },
          { "@type": "WebPage", url: "https://rosebud.global/industries/trades-home-services" },
        ],
      },
      {
        "@type": "Dataset",
        "@id": "https://rosebud.global/resources/2026-us-service-business-response-study#dataset",
        name: "The 2026 US Service Business Response Study — aggregate results",
        description: "Aggregate results from a mystery-shopping study of 273 US owner-operated service businesses across five sectors. Records whether each business had a working web enquiry form, whether a standardised enquiry received a response within 72 hours, time to first response, response channel, and whether the response was automated or from a person.",
        url: "https://rosebud.global/resources/2026-us-service-business-response-study",
        license: "https://creativecommons.org/licenses/by/4.0/",
        isAccessibleForFree: true,
        creator: { "@id": "https://rosebud.global/resources/2026-us-service-business-response-study#organization" },
        datePublished: "2026-08-13",
        temporalCoverage: "2026-07-26/2026-08-13",
        spatialCoverage: { "@type": "Place", name: "United States" },
        measurementTechnique: "Standardised web-form enquiry submitted to each business, with delivery confirmed by positive evidence (success redirect, in-form confirmation text, or cleared submission fields). Non-response recorded only after 72 hours elapsed from that business's own submission time.",
        variableMeasured: [
          { "@type": "PropertyValue", name: "Businesses with no working web enquiry form", value: "20.5", unitText: "PERCENT", unitCode: "P1", description: "56 of 273 businesses had no form present, a social link substituted for one, or a submission container that did not function. Measures web forms only." },
          { "@type": "PropertyValue", name: "Businesses with no working web enquiry form, dental and aesthetics", value: "42.9", unitText: "PERCENT", unitCode: "P1", description: "24 of 56 dental and aesthetic practices." },
          { "@type": "PropertyValue", name: "Delivered enquiries receiving any response within 72 hours", value: "29.9", unitText: "PERCENT", unitCode: "P1", description: "63 of 211 provably delivered enquiries." },
          { "@type": "PropertyValue", name: "Delivered enquiries receiving a response from a person within 72 hours", value: "21.3", unitText: "PERCENT", unitCode: "P1", description: "45 of 211 provably delivered enquiries." },
          { "@type": "PropertyValue", name: "Delivered enquiries receiving no response of any kind", value: "70.1", unitText: "PERCENT", unitCode: "P1", description: "148 of 211 provably delivered enquiries." },
          { "@type": "PropertyValue", name: "Median time to first response", value: "5.1", unitText: "HUR", unitCode: "HUR", description: "Median across 58 timed responses. Rises to 8.8 hours counting only replies from a person." },
          { "@type": "PropertyValue", name: "Response rate, enquiry sent outside business hours", value: "19.8", unitText: "PERCENT", unitCode: "P1", description: "24 of 121 enquiries, judged against each business's own local opening hours." },
          { "@type": "PropertyValue", name: "Response rate, enquiry sent during business hours", value: "34.8", unitText: "PERCENT", unitCode: "P1", description: "16 of 46 enquiries, judged against each business's own local opening hours." },
          { "@type": "PropertyValue", name: "Response rate, mortgage and lending", value: "15.0", unitText: "PERCENT", unitCode: "P1", description: "6 of 40 delivered enquiries. Only one was a reply from a person." },
          { "@type": "PropertyValue", name: "Response rate, commercial cleaning", value: "41.3", unitText: "PERCENT", unitCode: "P1", description: "19 of 46 delivered enquiries. Highest of the five sectors." },
        ],
        distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: "https://rosebud.global/data/response-study-2026-aggregate.csv", name: "Aggregate results, all metrics by sector" }],
        version: "2026.1",
        includedInDataCatalog: { "@type": "DataCatalog", name: "Rosebud Solutions Research", url: "https://rosebud.global/resources" },
      },
      {
        "@type": "Organization",
        "@id": "https://rosebud.global/resources/2026-us-service-business-response-study#organization",
        name: "Rosebud Solutions",
        legalName: "Rosebud Global Ltd",
        url: "https://rosebud.global",
        identifier: "16623472",
      },
    ],
    body: [
      { type: "p", text: "We submitted a real enquiry to 273 US owner-operated service businesses across commercial cleaning, dental and aesthetics, family law, mortgage and lending, and trades. We recorded whether the business had a working web enquiry route, whether a reply arrived, how long it took, on which channel, and whether it came from a person or a system." },
      { type: "p", text: "Two findings." },

      { type: "h2", id: "summary", text: "Summary" },
      { type: "h3", text: "One in five businesses had no web enquiry form" },
      { type: "p", text: "56 of 273, or 20.5%, had no form present, a social link substituted for one, or a submission container that did not function. In dental and aesthetics the figure is 42.9%. This measures web forms only and does not assess direct email links (`mailto:`) or telephone contact." },
      { type: "h3", text: "Seven in ten delivered enquiries were never answered" },
      { type: "p", text: "Of 211 enquiries provably delivered, 29.9% received any reply within 72 hours and 21.3% received a reply from a person. 70.1% received nothing at all." },
      { type: "p", text: "Existing figures in this area trace back to research published in 2011 and 2012, conducted on B2B sales pipelines. This study is primary, current, and measures owner-operated service businesses directly." },

      { type: "h2", id: "why-this-study-exists", text: "Why this study exists" },
      { type: "p", text: "Ask what proportion of businesses respond to an enquiry and the answers conflict. Published figures range from under 30% to over 60% contacted, and almost none state a denominator or a censoring window. Nearly all trace to the same two sources: a Harvard Business Review study of B2B lead pipelines and an InsideSales response-management study, both over a decade old." },
      { type: "p", text: "Nobody has measured whether a small US service business can receive a web enquiry at all. That is the question a customer actually faces." },

      { type: "h2", id: "method", text: "Method" },
      { type: "h3", text: "Sample" },
      { type: "p", text: "273 US owner-operated service businesses, drawn across five sectors." },
      { type: "table", head: ["Sector", "Businesses"], rows: [
        ["Trades", 56], ["Dental & aesthetic", 56], ["Commercial cleaning", 55], ["Mortgage & lending", 55], ["Family law", 51],
      ], totalRow: ["Total", 273] },

      { type: "h3", text: "The enquiry" },
      { type: "p", text: "One base message per sector, held constant in persona, tone, ask and sign-off. Family law and mortgage were sent verbatim with no variation. Cleaning, trades and dental substituted the named service according to a substitution table written before fieldwork began, so a plumber received a water heater enquiry and an electrician received an electrical one." },
      { type: "p", text: "The enquiry is standardised, not identical. A single message cannot be plausible to both a divorce lawyer and a roofer, and an implausible enquiry measures implausibility rather than responsiveness." },
      { type: "list", items: [
        { lead: "Commercial cleaning —", text: "“Hi, I manage a small office, around 2,000 sq ft, and we're looking for regular weekly cleaning. Can you send a quote or let me know what you need from me? Thanks”" },
        { lead: "Dental & aesthetic —", text: "“Hi, I'm new to the area and looking into [treatment]. Can you let me know availability and rough pricing for a first visit? Thanks”" },
        { lead: "Family law —", text: "“Hi, my partner and I are looking at an amicable separation and I'm trying to understand our options before we decide anything. Could someone let me know how you usually handle this? No rush, thanks”" },
        { lead: "Mortgage & lending —", text: "“Hi, I'm a first-time buyer just starting to look at options and wanted to understand your process and current rates. What's the best way to get started? Thanks”" },
        { lead: "Trades —", text: "“Hi, my water heater is getting old and I'm thinking about replacing it in the next month or two. Can you give me a rough quote or let me know what you'd need to see first? Thanks”" },
      ] },

      { type: "h3", text: "Delivery proof" },
      { type: "p", text: "An enquiry counts as delivered only on positive evidence. A submission is stamped delivered when it produces a redirect to a success path, confirmation text inside the submitted form container, or the submitted fields returning empty. Absent all three, the row is not counted as sent." },
      { type: "p", text: "The default is no proof, no row. A submission that appears to work but produces no evidence is treated as not delivered, not as delivered-and-ignored. This is deliberately conservative: it removes rows from the denominator rather than inflating the non-response rate." },
      { type: "p", text: "A later reply is itself proof of delivery, since a reply cannot exist without the enquiry arriving." },

      { type: "h3", text: "Censoring" },
      { type: "p", text: "A business is counted as a non-responder only after 72 hours have elapsed from its own submission time. The window is computed live per row, never against a fixed calendar date, so every business receives the same observation period regardless of when it was contacted." },
      { type: "p", text: "Rows still inside their first 72 hours are not counted either way. They are unfinished observations, not silence." },

      { type: "h3", text: "Classification" },
      { type: "p", text: "The rule below was written on 5 August 2026, before the classification pass it governs, and applied unchanged." },
      { type: "list", ordered: true, items: [
        { text: "Reply arrives within 5 minutes of submission — automated." },
        { text: "Reply is one of two or more near-identical messages in the same thread — automated." },
        { text: "Reply engages something specific to the actual submission — human." },
        { text: "Otherwise, tie-break on signature: a named individual is human, a generic department address is automated. Every tie-break is flagged as lower confidence." },
      ] },

      { type: "h3", text: "Definitions" },
      { type: "list", items: [
        { lead: "Contacted —", text: "A business in the sample, whether or not an enquiry could be submitted." },
        { lead: "No web enquiry form —", text: "No form present, a social link substituted for a form, no fillable form found, or a form confirmed non-functional. Assessed against forms only. Direct email links (`mailto:`), telephone numbers, and click-to-call were not assessed and do not count as a form." },
        { lead: "Delivered —", text: "Submission met the delivery-proof rule above." },
        { lead: "Response —", text: "Any reply of any kind, on any channel, within 72 hours." },
        { lead: "Substantive response —", text: "A reply classified as human under the rule above." },
      ] },

      { type: "h2", id: "finding-1", text: "Finding 1 · One in five businesses had no web enquiry form" },
      { type: "p", text: "Measured at the point of contact, across all 273 businesses." },
      { type: "p", text: "**56 of 273 businesses, 20.5%, had no working web enquiry form** — no form present, a social link substituted for one, or a submission container that did not function." },
      { type: "p", text: "This measures the presence and functionality of web forms only. It does not assess direct email links (`mailto:`), telephone numbers, or click-to-call, and some businesses in this group are reachable by those routes. The finding is that a written web enquiry, the route most customers reach for first, had nowhere to land." },
      { type: "table", head: ["Sector", "No web form", "Businesses", "Rate"], rows: [
        ["Dental & aesthetic", 24, 56, "42.9%"],
        ["Mortgage & lending", 15, 55, "27.3%"],
        ["Trades", 8, 56, "14.3%"],
        ["Commercial cleaning", 5, 55, "9.1%"],
        ["Family law", 4, 51, "7.8%"],
      ], totalRow: ["All sectors", 56, 273, "20.5%"] },
      { type: "bar-chart", title: "Businesses with no working web enquiry form, by sector", caption: "Figure 1 · Share of businesses with no working web enquiry form, by sector. n = 273.", unit: "%", bars: [
        { label: "Dental & aesthetic", value: 42.9, lead: true },
        { label: "Mortgage & lending", value: 27.3 },
        { label: "Trades", value: 14.3 },
        { label: "Commercial cleaning", value: 9.1 },
        { label: "Family law", value: 7.8 },
      ] },
      { type: "p", text: "This is a property of the business, not of the study instrument. It is measured before any enquiry is sent and does not depend on response timing, censoring, or classification." },
      { type: "p", text: "Dental and aesthetic practices are the outlier. More than two in five had no route by which a prospective patient could submit an enquiry online." },

      { type: "h2", id: "finding-2", text: "Finding 2 · Seven in ten delivered enquiries are never answered" },
      { type: "p", text: "Of 273 businesses contacted, 217 enquiries were submitted and 211 were provably delivered. Six are excluded because delivery could not be established either way." },
      { type: "table", head: ["Outcome", "Count", "Rate"], rows: [
        ["Any response within 72 hours", 63, "29.9%"],
        ["Response from a person", 45, "21.3%"],
        ["Automated acknowledgement only", 18, "8.5%"],
        ["No response of any kind", 148, "70.1%"],
      ] },
      { type: "bar-chart", title: "What happened to a delivered enquiry within 72 hours", caption: "Figure 2 · Outcome of a delivered enquiry within 72 hours. n = 211.", unit: "%", bars: [
        { label: "No response", value: 70.1, lead: true },
        { label: "Any response", value: 29.9 },
        { label: "— from a person", value: 21.3, muted: true },
        { label: "— auto-ack only", value: 8.5, muted: true },
      ] },

      { type: "h3", text: "By sector" },
      { type: "table", head: ["Sector", "Delivered", "Any response", "From a person"], rows: [
        ["Commercial cleaning", 46, "41.3%", "30.4%"],
        ["Family law", 47, "36.2%", "29.8%"],
        ["Trades", 47, "29.8%", "23.4%"],
        ["Dental & aesthetic", 31, "22.6%", "16.1%"],
        ["Mortgage & lending", 40, "15.0%", "2.5%"],
      ] },
      { type: "bar-chart", title: "Response rate by sector", caption: "Figure 3 · Share of delivered enquiries receiving any response within 72 hours, by sector. Sector pools range from 31 to 47 delivered enquiries.", unit: "%", bars: [
        { label: "Commercial cleaning", value: 41.3, lead: true },
        { label: "Family law", value: 36.2 },
        { label: "Trades", value: 29.8 },
        { label: "Dental & aesthetic", value: 22.6 },
        { label: "Mortgage & lending", value: 15.0 },
      ] },
      { type: "p", text: "Mortgage and lending is the weakest sector by a wide margin. Of 40 delivered enquiries, six drew any reply and exactly one came from a person. The other five were automated acknowledgements." },
      { type: "p", text: "Dental and aesthetics is weak on both measures. It has the highest rate of missing enquiry forms at 42.9%, and among practices that could receive an enquiry, 22.6% replied. A prospective patient faces two failure points rather than one." },

      { type: "h3", text: "How long a reply takes" },
      { type: "p", text: "Median time to first response: **5.1 hours**, across 58 timed responses." },
      { type: "table", head: ["Time to first response", "Responders"], rows: [
        ["Under 5 minutes", 10], ["5 to 15 minutes", 3], ["15 minutes to 1 hour", 9], ["1 to 4 hours", 6],
        ["4 to 24 hours", 18], ["24 to 48 hours", 9], ["48 to 72 hours", 1], ["After 72 hours", 2],
      ] },
      { type: "bar-chart", title: "Time to first response, responders only", caption: "Figure 4 · Time to first response, responders only. n = 58 timed responses. Median 5.1 hours.", bars: [
        { label: "Under 5 min", value: 10, muted: true },
        { label: "5–15 min", value: 3 },
        { label: "15 min–1 hr", value: 9 },
        { label: "1–4 hrs", value: 6 },
        { label: "4–24 hrs", value: 18, lead: true },
        { label: "24–48 hrs", value: 9 },
        { label: "48–72 hrs", value: 1 },
        { label: "After 72 hrs", value: 2 },
      ] },
      { type: "p", text: "Ten replies arrived within five minutes. Almost all were automated acknowledgements rather than a person, and under the classification rule a reply inside five minutes is recorded as automated." },
      { type: "p", text: "Counting only replies from a person, the median rises to 8.8 hours. The fastest was 7 minutes and the slowest 56 hours." },
      { type: "p", text: "Two replies arrived after the 72-hour window closed and are shown above for completeness. One was an automated missed-call text sent 16 days later by a phone system, which is reported in the data but excluded from any claim about how long businesses take to reply." },

      { type: "h3", text: "When the enquiry was sent" },
      { type: "p", text: "Each submission was assessed against the receiving business's own local opening hours." },
      { type: "table", head: ["Enquiry sent", "Delivered", "Any response"], rows: [
        ["Outside business hours", 121, "19.8%"],
        ["During business hours", 46, "34.8%"],
      ] },
      { type: "bar-chart", title: "Response rate by when the enquiry was sent", caption: "Figure 5 · Response rate by whether the enquiry arrived inside or outside the business's own opening hours. n = 167 of 211 delivered enquiries.", unit: "%", bars: [
        { label: "During business hours", value: 34.8, lead: true },
        { label: "Outside business hours", value: 19.8 },
      ] },
      { type: "p", text: "An enquiry arriving outside opening hours was answered at a little over half the rate of one arriving during them, measured over the same 72-hour window in both cases." },
      { type: "p", text: "This is the finding that matters most to a customer, because a customer does not wait for opening hours. Evenings and weekends are when people research a service, and they are when an enquiry is least likely to reach anyone." },
      { type: "p", text: "Opening hours were recorded for 167 of the 211 delivered enquiries. The remaining 44 are not included in this comparison." },

      { type: "h2", id: "takeaways", text: "Key takeaways" },
      { type: "p", text: "Every figure below is from this study. No external benchmark is used." },
      { type: "list", items: [
        { lead: "A written web enquiry has nowhere to land at one business in five.", text: "20.5% had no working form. Those customers never reach the queue, so no amount of follow-up discipline recovers them." },
        { lead: "Seven in ten delivered enquiries get nothing back.", text: "148 of 211 received no reply of any kind within 72 hours." },
        { lead: "A reply from a person is rarer still.", text: "21.3% of delivered enquiries were answered by a human being." },
        { lead: "The median reply takes 5.1 hours, and 8.8 hours if it comes from a person.", text: "Half of all people who did reply took longer than a working day to do it." },
        { lead: "Fast replies are mostly machines.", text: "Ten replies arrived within five minutes. Almost all were automated acknowledgements." },
        { lead: "Out-of-hours enquiries go unanswered.", text: "19.8% against 34.8% for enquiries arriving during opening hours, on the same 72-hour window. Customers research in the evening. Businesses respond in the morning, if at all." },
        { lead: "Some sectors are much worse than others.", text: "Mortgage and lending answered 15.0% of delivered enquiries and only 2.5% with a human reply. Dental and aesthetics combines the worst form coverage with a low response rate." },
        { lead: "The gap is capture, not generation.", text: "Every business in this sample already had demand arriving. What varied was whether anything happened to it." },
      ] },

      { type: "h2", text: "What this means for a business spending on demand" },
      { type: "p", text: "A business paying for enquiries is paying for the top of a funnel whose entry point may not work and whose response may not come. This study measures how often that is true. It does not measure what it costs, because that depends on the business." },
      { type: "p", text: "Rosebud Solutions operates the layer between an enquiry arriving and a booking being made: capture and response on every channel, qualification against the business's own rules, booking into a live calendar, reminders, and reactivation of leads that went cold. It is operated by Rosebud rather than configured by the client, and it stops at the booking, where the client's team takes over." },
      { type: "p", text: "The study was run on the same platform Rosebud operates for that work, which is why the question was worth asking and why the method is published in full above. [Pricing and plans](/pricing) · [How it works](/)" },

      { type: "h2", id: "limitations", text: "Limitations" },
      { type: "list", items: [
        { lead: "Sector pools are small.", text: "Delivered enquiries per sector range from 31 to 47. Sector rates carry a wide confidence interval and the ordering between adjacent sectors should not be treated as established. The gap between the highest and lowest sectors is large enough to be meaningful; the gap between neighbours is not." },
        { lead: "Sends were concentrated on five days.", text: "26 July, 28 July, 4 August, 7 August and 10 August. Day-of-week effects are not separable from batch effects, which is why the timing comparison is reported against each business's own opening hours rather than by calendar day." },
        { lead: "Opening hours were recorded for 167 of 211 delivered enquiries.", text: "The out-of-hours comparison uses that subset." },
        { lead: "Five responses could not be timed", text: "and are excluded from the time-to-response figures while remaining in the response counts." },
        { lead: "Six businesses are excluded", text: "because delivery could not be established either way. Four had a manual resubmission that could not be independently confirmed. Two returned a blank form with no error and no confirmation. All six are excluded rather than assumed in either direction." },
        { lead: "Response is not conversion.", text: "This study stops at first response. It does not measure whether a reply led to a booking, a quote, or a customer." },
        { lead: "Single enquiry per business.", text: "Each business received one enquiry. A business that missed one enquiry might answer the next, and a single test cannot separate a systemic failure from an owner on holiday or a short-staffed week." },
        { lead: "Spam filtering is unobservable.", text: "A form submission that reaches the business but is filtered before a person sees it is indistinguishable, from outside, from one that was seen and ignored. Both are recorded as no response. This applies to all form-submission research and cannot be measured from the sending side." },
        { lead: "Alternative contact routes were not assessed.", text: "Finding 1 measures the presence and functionality of web forms. Direct email links (`mailto:`), telephone numbers, and click-to-call were outside scope. A business counted as having no form may still be reachable by other means." },
      ] },

      { type: "h2", id: "data-availability", text: "Data availability" },
      { type: "p", text: "Aggregate figures are published here in full and as a machine-readable file: [response-study-2026-aggregate.csv](/data/response-study-2026-aggregate.csv), covering every metric in this report broken out by sector." },
      { type: "p", text: "Per-business records are held internally and are not published, since the study identifies named businesses that did not respond." },
      { type: "p", text: "Method, definitions, classification rule and exclusion criteria are published above in full so the figures can be independently assessed." },

      { type: "h2", id: "sector-findings", text: "Sector findings" },
      { type: "p", text: "Each sector's figures are set out on the industry page for that sector. Insurance and real estate were not in the study and carry no figure." },
      { type: "related", items: [
        { href: "/industries/dental-aesthetic", title: "Dental, aesthetic and private healthcare", desc: "42.9% had no working form, 22.6% responded" },
        { href: "/industries/mortgage-lending", title: "Mortgage and lending", desc: "15.0% responded, one reply from a person in 40" },
        { href: "/industries/family-law", title: "Family law and consumer legal", desc: "36.2% responded, slowest median reply" },
        { href: "/industries/commercial-cleaning", title: "Commercial cleaning and janitorial", desc: "41.3% responded, highest of the five" },
        { href: "/industries/trades-home-services", title: "Trades and home services", desc: "29.8% responded" },
      ] },

      { type: "h2", id: "citation", text: "Citation" },
      { type: "quote", text: "Rosebud Solutions (2026). The 2026 US Service Business Response Study: what happens when you send a US service business a web enquiry. Rosebud Global Ltd. Available at rosebud.global/resources/2026-us-service-business-response-study" },
      { type: "p", text: "Published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Reuse is permitted with attribution." },
      { type: "p", text: "Fieldwork 26 July to 10 August 2026. Response logging closed 13 August 2026. All figures final." },
      { type: "p", text: "Rosebud Solutions is a Rosebud Global Ltd company (Co. No. 16623472). Rosebud Solutions operates enquiry handling for service businesses, which is why this question was worth measuring. The study was self-funded and no business in the sample is a client." },

      {
        type: "faq", items: [
          { q: "How many US service businesses respond to a web enquiry?", a: "In a 2026 study of 273 US owner-operated service businesses, 29.9% of the 211 provably delivered enquiries received any response within 72 hours, and 21.3% received a response from a person. 70.1% received nothing at all." },
          { q: "How long does a service business take to respond to an enquiry?", a: "The median time to first response was 5.1 hours, rising to 8.8 hours counting only replies from a person. Ten of 211 delivered enquiries were answered within five minutes, and almost all of those were automated acknowledgements." },
          { q: "How many small businesses have a working contact form?", a: "20.5% of the 273 US service businesses studied had no working web enquiry form. The figure was highest in dental and aesthetics at 42.9%, and lowest in family law at 7.8%." },
          { q: "Do businesses respond to weekend enquiries?", a: "Less often. Enquiries arriving outside a business's own opening hours received a response 19.8% of the time, against 34.8% for enquiries arriving during opening hours, measured over identical 72-hour windows." },
          { q: "Which service businesses are worst at responding to enquiries?", a: "Of the five sectors studied, mortgage and lending was weakest: 15.0% of delivered enquiries drew any reply and only 2.5% drew a reply from a person. Commercial cleaning was strongest at 41.3%. Dental and aesthetics combined the highest rate of missing enquiry forms, 42.9%, with a 22.6% response rate." },
        ],
      },
    ],
  },

  "how-to-get-cleaning-contracts": {
    slug: "how-to-get-cleaning-contracts",
    title: "How to Get Cleaning Contracts: Where to Find Them & How to Bid",
    dek: "Where cleaning contracts are posted, how to bid on them, and how to win the office, government, post-construction and apartment work that never reaches a bid board.",
    stage: "capture",
    sector: "cleaning",
    kind: "guide",
    mins: 12,
    date: "2026-08-13",
    author: { name: "Sajni Richardson", role: "COO, Rosebud Solutions" },
    toc: [
      { id: "where-cleaning-contracts-actually-come-from", label: "Where cleaning contracts actually come from" },
      { id: "where-open-bids-for-cleaning-contracts-are-posted", label: "Where open bids are posted" },
      { id: "how-to-get-cleaning-contracts-with-the-government", label: "How to get contracts with the government" },
      { id: "how-to-get-office-cleaning-contracts", label: "How to get office cleaning contracts" },
      { id: "how-to-get-post-construction-cleaning-contracts", label: "How to get post-construction contracts" },
      { id: "how-to-get-cleaning-contracts-with-apartment-buildings--banks", label: "Apartment buildings & banks" },
      { id: "how-to-bid-on-cleaning-contracts", label: "How to bid on cleaning contracts" },
      { id: "how-to-tell-whether-a-bid-is-worth-your-time", label: "Is the bid worth your time?" },
      { id: "the-part-most-cleaning-companies-lose-on", label: "The part most companies lose on" },
      { id: "get-the-bid-template", label: "Get the bid template" },
      { id: "where-to-start-this-week", label: "Where to start this week" },
      { id: "frequently-asked-questions", label: "Frequently asked questions" },
    ],
    body: [
      { type: "p", text: "Most commercial cleaning companies find work the same way: a referral, a drive-by, a call from a property manager who is unhappy with their current contractor. It works, and it does not scale, because none of it is on a schedule you control." },
      { type: "p", text: "There are three routes to a cleaning contract, and only one of them is published. This guide covers all three, then the bid itself, then the part that decides most of them." },

      { type: "h2", id: "where-cleaning-contracts-actually-come-from", text: "Where cleaning contracts actually come from" },
      { type: "list", items: [
        { lead: "Published bids.", text: "Public agencies are required to advertise. Schools, hospitals, housing authorities and transit agencies mostly follow the same practice. These are the contracts you can find on a schedule, and they are the only ones where the competition is visible." },
        { lead: "Direct approach to private buildings.", text: "Offices, retail, medical suites, industrial units. Nothing is published. The work moves when a building owner or facilities manager gets frustrated with their incumbent and asks two or three companies for a quote. This is the largest pool by a distance." },
        { lead: "Subcontracting under a prime.", text: "National facility services companies hold contracts covering more buildings than they staff directly and subcontract portions. Lower margin, no sales cost, and useful volume while you build direct accounts." },
      ] },
      { type: "p", text: "Most companies work one of these three. The ones that grow work all three at once, because the published route has a predictable calendar and the private route has the better margin." },

      { type: "h2", id: "where-open-bids-for-cleaning-contracts-are-posted", text: "Where open bids for cleaning contracts are posted" },
      { type: "h3", text: "SAM.gov, for federal contracts" },
      { type: "p", text: "Federal agencies post janitorial solicitations valued above $25,000 on [SAM.gov](https://sam.gov/), and [Federal Acquisition Regulation Part 5](https://www.acquisition.gov/far/part-5#FAR_5_101) requires them to be published so competition is open. It is the single largest published source of cleaning work in the United States." },
      { type: "p", text: "Two filters save the most time. [Filter by response date](https://sam.gov/opportunities), or you will read a solicitation that closed eight months ago. Then read the notice type, because sources sought, presolicitation, solicitation and award notice each call for a different action. A sources sought notice is market research, not a bid. An award notice tells you who won and at what price, which is the most useful competitive intelligence available to you, and it is free." },
      { type: "h3", text: "State, county & city purchasing portals" },
      { type: "p", text: "This is where most cleaning companies should start. The contracts are smaller, the competition is local, and a completed municipal contract is the past performance record that qualifies you for larger work later." },
      { type: "p", text: "Go directly to the purchasing or procurement page for your city, county and state. Many agencies post solicitations on their own site and never list them on a third-party platform. Practice varies: some cities require vendor registration before you can submit anything, and others let you subscribe to automatic notification emails whenever a bid matching your categories is published. Register everywhere you would realistically send a crew, then let the notifications do the searching." },
      { type: "h3", text: "Institutional buyers" },
      { type: "p", text: "School districts, universities, hospitals, housing authorities and transit agencies run large facilities and rebid them on a cycle. Their purchasing pages work like a municipality's." },
      { type: "p", text: "Worth tracking specifically, because the square footage is large, the terms are long, and the buyer cares more about whether you can staff the building reliably than whether you are the cheapest number on the table." },
      { type: "h3", text: "Aggregators" },
      { type: "p", text: "[BidNet Direct](https://www.bidnetdirect.com/company), GovernmentBids.com, GovWin and similar services pull solicitations from many sources into one feed. BidNet Direct alone carries a network of over a thousand local government agencies, on BidNet's own figures, uploading bid documents directly." },
      { type: "p", text: "Most charge a subscription. The honest calculation is whether it costs less than the hours you would spend checking two dozen portals every morning. Bidding in one county, it usually does not. Bidding across a state, it usually does." },

      { type: "h2", id: "how-to-get-cleaning-contracts-with-the-government", text: "How to get cleaning contracts with the government" },
      { type: "p", text: "Registration comes before searching, because it takes longer than most response windows." },
      { type: "list", ordered: true, items: [
        { lead: "Get a Unique Entity ID on [SAM.gov](https://sam.gov/entity-registration).", text: "You cannot bid on federal facility work without one." },
        { lead: "[Register the right NAICS codes](https://sam.gov/entity-registration).", text: "Janitorial services is 561720. Add 561790 for specialized cleaning such as windows, carpet and upholstery, and 561730 for landscaping and grounds where a facility contract bundles them. If you are not registered for the code on a solicitation, it may not surface in your searches, and agencies researching contractors will not find you." },
        { lead: "Verify as a small business.", text: "The federal government sets a goal of awarding [23% of all contracts](https://www.sba.gov/about-sba/sba-locations/headquarters-offices/office-government-contracting-business-development) to small businesses, and only firms verified as small on SAM are eligible for those set-asides. Janitorial is one of the more accessible categories under that goal." },
        { lead: "Build local past performance first.", text: "A city or school district contract is smaller, faster to win, and produces the documented record a federal evaluator will ask you for. Working the federal route first, with nothing behind you, is the most common way to spend six months and win nothing." },
      ] },

      { type: "h2", id: "how-to-get-office-cleaning-contracts", text: "How to get office cleaning contracts" },
      { type: "p", text: "Office work is almost entirely private, which means there is no list. There are three ways in." },
      { type: "p", text: "**Property management and commercial real estate firms.** They control multiple buildings and maintain approved vendor lists. Register, then stay in front of the facilities manager. One relationship here can carry more square footage than a year of individual buildings." },
      { type: "p", text: "**Direct approach to the building.** Identify the buildings you can service well from where your crews already are. Find the property manager rather than the tenant. The tenant does not hold the contract." },
      { type: "p", text: "Three methods do the work here, and they are ranked by what actually converts:" },
      { type: "list", items: [
        { lead: "Walk-ins.", text: "Visit local commercial buildings, business parks and strip malls and ask at reception for the name of the office or facility manager. You are collecting a name, not pitching. Most walk-ins fail because the cleaner tries to sell to whoever is at the desk." },
        { lead: "Cold calling and emailing.", text: "Call the named manager and offer a free, no-obligation walkthrough and estimate. Offering the walkthrough converts far better than offering a quote, because it costs them nothing and it puts you in the building." },
        { lead: "Networking with brokers and property managers.", text: "Commercial real estate brokers and property management firms know which buildings are changing hands and which managers are unhappy. One broker relationship surfaces more opportunities than a month of walk-ins." },
      ] },
      { type: "p", text: "**Being available at the moment they are frustrated.** The office cleaning contract changes hands when a building has a bad month, and the manager contacts two or three companies that day. You cannot schedule that. You can only make sure the enquiry reaches you and gets answered, which is [the section further down](#the-part-most-cleaning-companies-lose-on)." },

      { type: "h2", id: "how-to-get-post-construction-cleaning-contracts", text: "How to get post construction cleaning contracts" },
      { type: "p", text: "Post-construction is a different sale, because the buyer is the general contractor, not the building owner." },
      { type: "p", text: "The work splits into three phases:" },
      { type: "list", ordered: true, items: [
        { lead: "Rough clean.", text: "Heavy debris removal while construction is still running." },
        { lead: "Final clean.", text: "Full detail before handover to the client." },
        { lead: "Touch-up.", text: "The last pass after the punch list is closed out." },
      ] },
      { type: "p", text: "Some GCs contract all three. Most contract the final clean." },
      { type: "p", text: "Two things make this route worth building." },
      { type: "p", text: "**Rates are higher.** It is heavier, dirtier work with debris, dust and adhesive residue, and it is priced accordingly, usually hourly or at a per-square-foot rate well above routine janitorial." },
      { type: "p", text: "**It repeats.** A general contractor who trusts you on one handover calls you on the next project, and the next. The relationship is with the project manager, not the property. Build a short list of GCs working in your area, find the project managers, and stay in front of them between projects." },
      { type: "p", text: "The catch is the schedule. Handover dates move, and they move late. If you cannot mobilize a crew at two days' notice you will lose the second job even after winning the first." },

      { type: "h2", id: "how-to-get-cleaning-contracts-with-apartment-buildings--banks", text: "How to get cleaning contracts with apartment buildings & banks" },
      { type: "p", text: "**Apartments** are volume work with three components: unit turnovers between tenants, common area cleaning on a fixed schedule, and periodic deep cleans. The buyer is usually a property management company running several properties, so one contract can cover a portfolio. Turnovers are unpredictable in timing and predictable in volume, which suits a company that can flex crew hours. Expect churn: management companies change hands and rebid." },
      { type: "p", text: "**Banks** are branch network contracts. They are slower to win and stickier once won. Expect background checks on every person entering a branch, documented security procedures, and cleaning outside banking hours. The decision often sits with a regional facilities manager rather than the branch, and larger networks frequently buy through a national facility management firm, which means the realistic route in is as a subcontractor rather than a prime." },

      { type: "h2", id: "how-to-bid-on-cleaning-contracts", text: "How to bid on cleaning contracts" },
      { type: "p", text: "The bid is a labor calculation with a margin on it. Everything else is presentation." },
      { type: "p", text: "**Walk the building first.** A walkthrough on anything above roughly $1,500 a month is not optional. A floor plan will not show you high ceilings, delicate flooring, furniture density, soil load or restroom count. It is also your only chance to meet the decision maker before they see your number." },
      { type: "p", text: "**Calculate labor from a production rate.** Production rate is how many square feet one cleaner covers per hour for a given task, and it is the number that decides whether the bid is profitable. The [ISSA 612 cleaning times standard](https://www.issa.com/articles/how-to-calculate-cleaning-times/) is the industry benchmark. Published general-office figures vary by source, roughly 2,500 to 4,200 square feet per hour, and medical space runs far slower at around 2,200. That spread is the point: use your own measured rate, and break the building into area types rather than applying one rate to the whole floor." },
      { type: "callout", lines: ["Cleanable square footage ÷ production rate = hours per visit", "Hours per visit × visits per month × fully loaded labor rate = monthly labor cost"] },
      { type: "p", text: "Fully loaded means wage plus payroll taxes, workers' compensation and insurance, not the hourly wage." },
      { type: "p", text: "**Add what people forget.** Drive time, because a crew driving 45 minutes each way costs you an hour and a half of unpaid labor per visit. Supervision, because somebody has to check the work and take the client's calls. Consumables, because trash liners and paper products add up faster than chemicals do." },
      { type: "p", text: "**Then add margin, do not hope for it.** Monthly bid = total monthly cost ÷ (1 − target margin). Pricing off what you think the client wants to pay is how companies win contracts that cost them money every month." },
      { type: "p", text: "**Present a monthly figure.** Give the total monthly cost and a complete scope. Buyers do not want to audit your labor hours, and showing them invites a negotiation on your production rate rather than on your service." },
      { type: "p", text: "**Then follow up.** Follow up within 48 hours of submitting, and again about five days later. A large share of bids are lost to silence rather than to price." },

      { type: "h2", id: "how-to-tell-whether-a-bid-is-worth-your-time", text: "How to tell whether a bid is worth your time" },
      { type: "p", text: "Three checks, in order." },
      { type: "list", items: [
        { lead: "Is it real work, or market research?", text: "Sources sought means the agency is finding out who exists. Answer it briefly. Do not build a proposal against it." },
        { lead: "Who held it before?", text: "Incumbent information is often published, and SAM.gov holds historical award data including previous winning amounts. If the same contractor has held it three cycles with no complaint on record, your odds are poor and your time is better spent on a building whose manager is already unhappy." },
        { lead: "Can you staff it on day one?", text: "Winning a building you cannot crew costs more than losing it. Check required hours, clearances, the wage determination if it is federal, and whether the specification requires a supervisor on site." },
      ] },

      { type: "h2", id: "the-part-most-cleaning-companies-lose-on", text: "The part most cleaning companies lose on" },
      { type: "p", text: "Everything above finds the opportunity. The opportunity then arrives as an enquiry, and that is where most of them are lost." },
      { type: "p", text: "A property manager fills in the contact form on your site at 4pm on a Friday because their contractor missed two nights. A facilities coordinator emails asking whether you can walk the building next week. A general contractor sends a post-construction request with a Monday deadline. None of them announce themselves as a contract worth six figures over three years, and all of them go to whoever answers first." },
      { type: "quote", text: "We tested this. We submitted enquiries to hundreds of US service businesses, commercial cleaning companies among them, and a striking share had no working web enquiry form at all. Of the enquiries that did arrive, most got no reply inside three days." },
      { type: "p", text: "That is the real gap. The bid boards are public and available to everyone equally. What happens in the hours after somebody decides to contact you is not." },
      { type: "p", text: "Three things close it, and none require new software:" },
      { type: "list", items: [
        { lead: "Test your own form from outside your network.", text: "Send yourself an enquiry from a phone on cellular data, not office wifi, and confirm it arrives." },
        { lead: "Reply in minutes, not hours.", text: "The first company to respond books the walkthrough. The second is told the decision is made." },
        { lead: "Follow up on a schedule that runs without anyone remembering.", text: "Most cleaning enquiries do not convert on the first exchange. They convert on the third." },
      ] },

      {
        type: "cta-download",
        heading: "Get the bid template",
        body: "Two parts. Part one is a pricing worksheet you keep: production rates by area type, fully loaded labor rate, the costs most bids forget, and a margin formula you cannot get wrong. Part two is the bid document you send, with scope, exclusions, insurance, references and a follow-up schedule.",
        buttonLabel: "Send me the bid template",
        resourceKey: "cleaning-bid-template",
      },

      { type: "h2", id: "where-to-start-this-week", text: "Where to start this week" },
      { type: "p", text: "Register on SAM.gov, because registration is the slowest step and you want it done before you need it. Find the purchasing page for your city and county and subscribe to bid notifications. Then list ten property managers and five general contractors operating in your service area and find the right name at each." },
      { type: "p", text: "Then test your own enquiry form. The published bids are competitive by design. The private enquiry that lands on your website is not, unless you make it so by taking a day to answer it." },

      {
        type: "faq", items: [
          { q: "How do you bid on cleaning contracts?", a: "Walk the building, measure the cleanable square footage, and divide it by your production rate to get hours per visit. Multiply by visits per month and your fully loaded labor rate, add supplies, drive time and supervision, then divide the total by one minus your target margin. Present a single monthly figure with a complete scope rather than a breakdown of hours." },
          { q: "How do you find commercial cleaning contracts?", a: "Published work is on SAM.gov for federal contracts and on city, county and state purchasing portals for local ones. Private work is not published anywhere, so it comes from property management firms, direct approach to buildings you can service, and subcontracting under national facility services companies." },
          { q: "How do you get your first cleaning contract?", a: "Set the business up properly first: registration, general liability and workers' compensation insurance, because no commercial buyer will sign without them. Then pick a small area you can service reliably and work it three ways: walk into local commercial buildings and get the facility manager's name, call that name and offer a free walkthrough and estimate, and register on your city and county purchasing portals for published bids. The first contract almost always comes from direct outreach rather than a bid board, and a small building you service well becomes the reference that wins the next one." },
          { q: "How do you get cleaning contracts for a new cleaning business?", a: "Once the first account is running, the constraint changes from finding work to being findable. Register on every city and county purchasing portal in your service area so published bids arrive by email rather than by search, get on the approved vendor list of two or three property management firms, and ask your first client for a written reference naming the building type and square footage. A new company loses most contracts to not being asked, not to being outbid." },
          { q: "How do you get Airbnb cleaning contracts?", a: "Airbnb turnover work comes from property managers running multiple listings rather than from individual hosts. Approach short-term rental management companies directly, and be explicit about turnaround time, since same-day turnover between a checkout and a check-in is the constraint that decides who they hire. This is residential turnover work and prices differently from commercial janitorial." },
          { q: "How much do cleaning contracts pay?", a: "Routine janitorial contracts commonly price between roughly $0.08 and $0.15 per square foot per month at around three visits a week, varying widely by facility type, frequency, scope and local labor cost. Medical, industrial and post-construction work prices well above that range. Price from your own measured costs rather than a benchmark, because a rate that is profitable in one market loses money in another." },
          { q: "How do you win a cleaning contract against a cheaper competitor?", a: "Most contracts are lost to silence rather than price. Follow up within 48 hours of submitting and again around day five, do a proper walkthrough so your scope is visibly more complete than a competitor's, and give the buyer a reference from a comparable building. Where price is genuinely the deciding factor, the buyer is usually one you would lose money serving anyway." },
          { q: "How do you get cleaning contracts with the government?", a: "Get a Unique Entity ID on SAM.gov, register NAICS code 561720 for janitorial services along with 561790 and 561730, and verify as a small business so you are eligible for set-aside contracts. Then filter solicitations by response date and notice type, and use published award notices to see who held the contract before and at what price." },
          { q: "How do you start a contract cleaning business?", a: "Register the business, get general liability and workers' compensation insurance, and work out your fully loaded hourly labor cost before you quote anything. Then pick one building type you can service well from where you are based, rather than bidding everything. The first three contracts come from direct approach, not from bid boards." },
        ],
      },

      {
        type: "related", items: [
          { href: "/industries/commercial-cleaning", title: "Commercial cleaning enquiry handling", desc: "How Rosebud answers and books every enquiry that lands" },
          { href: "/pricing", title: "Pricing" },
        ],
      },
    ],
  },
};
