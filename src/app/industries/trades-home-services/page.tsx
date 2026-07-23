import type { Metadata } from "next";
import IndustryPage from "@/components/redesign/IndustryPage";
import { TRADES } from "@/components/redesign/industryData";

// Reference port: /industries/trades-home-services on the redesign template.
// Copy is a verbatim carry-over from the June page (see industryData.ts) — this
// page exists to prove the new template holds the old content without loss.
export const metadata: Metadata = {
  title: TRADES.seo.title,
  description: TRADES.seo.description,
  alternates: { canonical: "/industries/trades-home-services" },
  openGraph: {
    title: TRADES.seo.ogTitle,
    description: TRADES.seo.ogDescription,
    url: "https://rosebud.global/industries/trades-home-services",
    type: "website",
  },
};

export default function TradesHomeServicesPage() {
  return <IndustryPage data={TRADES} />;
}
