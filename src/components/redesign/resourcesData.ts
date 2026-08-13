// Data for the /resources library (index) and /resources/[slug] (article)
// templates. Add an entry to RESOURCES to publish it — the index page,
// filters, tallies and sort all update themselves off this one array.
// `stage` must match a key in STAGES, `sector` a key in SECTORS, `kind` a
// key in KINDS. Stage keys mirror the capability slugs in capabilityData.ts
// so the same taxonomy is used site-wide.

export type ResourceBody =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "stat-row"; stats: { value: string; label: string }[] };

export type ResourceItem = {
  slug: string;
  title: string;
  dek: string;
  stage: string;
  sector: string;
  kind: string;
  mins: number;
  date: string; // ISO yyyy-mm-dd
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
    dek: "Standardised enquiries submitted to 273 owner-operated service businesses across five sectors. What came back, and what did not.",
    stage: "capture",
    sector: "all",
    kind: "study",
    mins: 12,
    date: "2026-08-13",
    body: [
      { type: "p", text: "[PLACEHOLDER — awaiting final copy. Replace this section with the study's overview: what was tested, why, and the headline finding.]" },
      { type: "h2", text: "Methodology" },
      { type: "p", text: "[PLACEHOLDER — how the 273 businesses were selected, what the standardised enquiry looked like, the response window, and what counted as a response.]" },
      { type: "stat-row", stats: [
        { value: "273", label: "Businesses enquired" },
        { value: "—", label: "Responded" },
        { value: "—", label: "Median response time" },
      ] },
      { type: "h2", text: "What came back" },
      { type: "p", text: "[PLACEHOLDER — sector-by-sector breakdown of response rate and speed.]" },
      { type: "h2", text: "What this means" },
      { type: "p", text: "[PLACEHOLDER — the takeaway for an owner reading this.]" },
    ],
  },
};
