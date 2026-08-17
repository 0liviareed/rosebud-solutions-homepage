import type { MetadataRoute } from "next";
import { RESOURCES } from "@/components/redesign/resourcesData";
import { INDUSTRY_LINKS } from "@/components/redesign/industryData";
import { CAPABILITIES } from "@/components/redesign/capabilityData";

const BASE = "https://rosebud.global";

// Derived from the same data sources the pages themselves render from
// (capability slugs, industry slugs, resource articles) rather than a
// hand-maintained list — a manually kept list drifted out of sync
// repeatedly (an Ahrefs audit 2026-08-17 flagged 9 indexable pages missing
// here, including every capability page and /about). Only /careers/sdr and
// /careers/ae are listed below, not their /apply children — those carry
// `robots: { index: false }` and shouldn't be in the sitemap at all.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/integrations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...Object.values(RESOURCES).map((r) => ({
      url: `${BASE}/resources/${r.slug}`,
      lastModified: new Date(r.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...Object.keys(CAPABILITIES).map((slug) => ({
      url: `${BASE}/capabilities/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...INDUSTRY_LINKS.map((ind) => ({
      url: `${BASE}/industries/${ind.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${BASE}/careers/sdr`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/careers/ae`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/plan-finder`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/dpa`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
