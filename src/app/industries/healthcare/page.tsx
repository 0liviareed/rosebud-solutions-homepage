import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { HEALTHCARE_STAGE } from "@/components/redesign/industryStageData";

// /industries/healthcare on the new staged design, copy regenerated for the
// dental / aesthetic / private-healthcare vertical. Scenes are placeholders
// until supplied PNGs land in /assets/industries/healthcare/. Preview only
// (redesign branch) until layout + copy sign-off.
export const metadata: Metadata = {
  title: HEALTHCARE_STAGE.seo.title,
  description: HEALTHCARE_STAGE.seo.description,
  alternates: { canonical: "/industries/healthcare" },
  openGraph: {
    title: HEALTHCARE_STAGE.seo.ogTitle,
    description: HEALTHCARE_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/healthcare",
    type: "website",
  },
};

export default function HealthcarePage() {
  return <IndustryStagePage data={HEALTHCARE_STAGE} />;
}
