// "Rosebud for [industry]" hero switcher — the interlinked cluster (canonical order).
export const INDUSTRY_SIBLINGS: { name: string; slug: string }[] = [
  { name: "Dental, Aesthetic & Private Healthcare", slug: "dental-aesthetic" },
  { name: "Family Law & Consumer Legal", slug: "family-law" },
  { name: "Mortgage & Lending", slug: "mortgage-lending" },
  { name: "Insurance", slug: "insurance" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Trades & Home Services", slug: "trades-home-services" },
  { name: "Commercial Cleaning & Janitorial", slug: "commercial-cleaning" },
];

// In-scope industry links for the two crawl-route locations (capability-page
// integrations row + the integrations-page footer). Recruitment EXCLUDED (410).
// Single source of truth: edit the one slug at healthcare→dental-aesthetic.
export const INDUSTRY_LINKS: { name: string; slug: string }[] = [
  { name: "Dental, Aesthetic & Private Healthcare", slug: "dental-aesthetic" },
  { name: "Family Law & Consumer Legal", slug: "family-law" },
  { name: "Mortgage & Lending", slug: "mortgage-lending" },
  { name: "Insurance", slug: "insurance" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Trades & Home Services", slug: "trades-home-services" },
  { name: "Commercial Cleaning & Janitorial", slug: "commercial-cleaning" },
];

const DEMO = "https://cal.eu/rosebudsolutions/demo";
export { DEMO };
