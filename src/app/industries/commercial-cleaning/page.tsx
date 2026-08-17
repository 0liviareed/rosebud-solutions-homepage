import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { CLEANING_STAGE } from "@/components/redesign/industryStageData";

// /industries/commercial-cleaning on the staged design, same shape as the
// other six. title uses { absolute: ... } to opt out of the root layout's
// title.template ("%s | Rosebud Global") — without it this would render
// doubled, same bug fixed sitewide 2026-08-11.
export const metadata: Metadata = {
  title: { absolute: CLEANING_STAGE.seo.title },
  description: CLEANING_STAGE.seo.description,
  alternates: { canonical: "/industries/commercial-cleaning" },
  openGraph: {
    title: CLEANING_STAGE.seo.ogTitle,
    description: CLEANING_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/commercial-cleaning",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: CLEANING_STAGE.seo.ogTitle,
    description: CLEANING_STAGE.seo.ogDescription,
    images: ["/opengraph-image"],
  },
};

export default function CommercialCleaningPage() {
  return <IndustryStagePage data={CLEANING_STAGE} />;
}
