import type { Metadata } from "next";
import IndustryStagePage from "@/components/redesign/IndustryStagePage";
import { TRADES_STAGE } from "@/components/redesign/industryStageData";

// /industries/trades-home-services on the new staged design (Dora "Trades"
// mockup): hero → 3 stages + pull-stat → dark FAQ → related → offer. This is
// the visual reference for the industry-page family. Preview (redesign branch)
// only until the layout + copy are signed off.
export const metadata: Metadata = {
  title: { absolute: TRADES_STAGE.seo.title },
  description: TRADES_STAGE.seo.description,
  alternates: { canonical: "/industries/trades-home-services" },
  openGraph: {
    title: TRADES_STAGE.seo.ogTitle,
    description: TRADES_STAGE.seo.ogDescription,
    url: "https://rosebud.global/industries/trades-home-services",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: TRADES_STAGE.seo.ogTitle,
    description: TRADES_STAGE.seo.ogDescription,
    images: ["/opengraph-image"],
  },
};

export default function TradesHomeServicesPage() {
  return <IndustryStagePage data={TRADES_STAGE} />;
}
