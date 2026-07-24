import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { HEALTHCARE_STAGE } from "@/components/redesign/industryStageData";

// /industries/dental-aesthetic on the staged design (renamed from /healthcare,
// 301 in next.config). Copy targets patient intake software for dental /
// aesthetic / private-healthcare practices. Preview only until sign-off.
export const metadata: Metadata = {
  title: HEALTHCARE_STAGE.seo.title,
  description: HEALTHCARE_STAGE.seo.description,
  alternates: { canonical: "/industries/dental-aesthetic" },
  openGraph: {
    title: HEALTHCARE_STAGE.seo.ogTitle,
    description: HEALTHCARE_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/dental-aesthetic",
    type: "website",
  },
};

export default function DentalAestheticPage() {
  return <IndustryStagePage data={HEALTHCARE_STAGE} />;
}
