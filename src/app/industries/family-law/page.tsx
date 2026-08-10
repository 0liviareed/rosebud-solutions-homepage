import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { FAMILY_LAW_STAGE } from "@/components/redesign/industryStageData";

// /industries/family-law on the new staged design (Dora "Legal" mockup),
// retargeted to "legal intake software" and keeping the "what stays with you"
// boundary block. Copy is drafted off the approved mockup; it does NOT ship to
// production (main) until Saj + Jay sign off. Preview (redesign branch) only.
export const metadata: Metadata = {
  title: { absolute: FAMILY_LAW_STAGE.seo.title },
  description: FAMILY_LAW_STAGE.seo.description,
  alternates: { canonical: "/industries/family-law" },
  openGraph: {
    title: FAMILY_LAW_STAGE.seo.ogTitle,
    description: FAMILY_LAW_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/family-law",
    type: "website",
  },
};

export default function FamilyLawPage() {
  return <IndustryStagePage data={FAMILY_LAW_STAGE} />;
}
