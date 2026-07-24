import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { INSURANCE_STAGE } from "@/components/redesign/industryStageData";

// /industries/insurance on the new staged design, copy regenerated for the
// agency vertical. Scenes are placeholders until supplied PNGs land in
// /assets/industries/insurance/. Preview only until layout + copy sign-off.
export const metadata: Metadata = {
  title: INSURANCE_STAGE.seo.title,
  description: INSURANCE_STAGE.seo.description,
  alternates: { canonical: "/industries/insurance" },
  openGraph: {
    title: INSURANCE_STAGE.seo.ogTitle,
    description: INSURANCE_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/insurance",
    type: "website",
  },
};

export default function InsurancePage() {
  return <IndustryStagePage data={INSURANCE_STAGE} />;
}
