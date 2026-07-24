import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { MORTGAGE_STAGE } from "@/components/redesign/industryStageData";

// /industries/mortgage-lending on the new staged design, copy regenerated for
// the lender vertical. Scenes are placeholders until supplied PNGs land in
// /assets/industries/mortgage-lending/. Preview only until layout + copy sign-off.
export const metadata: Metadata = {
  title: MORTGAGE_STAGE.seo.title,
  description: MORTGAGE_STAGE.seo.description,
  alternates: { canonical: "/industries/mortgage-lending" },
  openGraph: {
    title: MORTGAGE_STAGE.seo.ogTitle,
    description: MORTGAGE_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/mortgage-lending",
    type: "website",
  },
};

export default function MortgageLendingPage() {
  return <IndustryStagePage data={MORTGAGE_STAGE} />;
}
