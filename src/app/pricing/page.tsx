import type { Metadata } from "next";
import PricingV2 from "@/components/redesign/PricingV2";

export const metadata: Metadata = {
  title: "Pricing — Rosebud Solutions",
  description:
    "Pricing that scales with the leads you already pay for. Every plan runs all six flows end to end; closed-loop attribution is an optional add-on, on by default for Expand & Scale.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Rosebud Solutions",
    description:
      "Every plan runs all six flows end to end. Closed-loop attribution is an optional add-on. Four self-serve tiers plus Enterprise.",
    url: "https://rosebud.global/pricing",
    type: "website",
  },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://rosebud.global/pricing" },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS) }} />
      <PricingV2 />
    </>
  );
}
