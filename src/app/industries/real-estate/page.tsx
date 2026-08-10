import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { REAL_ESTATE_STAGE } from "@/components/redesign/industryStageData";

// /industries/real-estate on the new staged design, copy regenerated for the
// agent vertical. Scenes are placeholders until supplied PNGs land in
// /assets/industries/real-estate/. Preview only until layout + copy sign-off.
export const metadata: Metadata = {
  title: { absolute: REAL_ESTATE_STAGE.seo.title },
  description: REAL_ESTATE_STAGE.seo.description,
  alternates: { canonical: "/industries/real-estate" },
  openGraph: {
    title: REAL_ESTATE_STAGE.seo.ogTitle,
    description: REAL_ESTATE_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/real-estate",
    type: "website",
  },
};

export default function RealEstatePage() {
  return <IndustryStagePage data={REAL_ESTATE_STAGE} />;
}
