import type { Metadata } from "next";
import IndustryPage from "@/components/redesign/IndustryPage";
import { FAMILY_LAW } from "@/components/redesign/industryData";

// RETARGET DRAFT (reference) — /industries/family-law on the §5 template, retargeted
// to "legal intake software". Copy is a draft off the current live page; it does NOT
// ship until Saj + Jay have edited it. Preview only until then.
export const metadata: Metadata = {
  title: FAMILY_LAW.seo.title,
  description: FAMILY_LAW.seo.description,
  alternates: { canonical: "/industries/family-law" },
  openGraph: {
    title: FAMILY_LAW.seo.ogTitle,
    description: FAMILY_LAW.seo.ogDescription,
    url: "https://rosebud.global/industries/family-law",
    type: "website",
  },
};

export default function FamilyLawPage() {
  return <IndustryPage data={FAMILY_LAW} />;
}
