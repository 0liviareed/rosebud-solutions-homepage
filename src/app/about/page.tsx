import type { Metadata } from "next";
import AboutV2 from "@/components/redesign/AboutV2";

const ABOUT_DESCRIPTION =
  "Rosebud Solutions — Demand Capture & Conversion Infrastructure. Seven capabilities on one engine carry every inquiry through to a booked appointment.";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Rosebud Global",
    description: ABOUT_DESCRIPTION,
    url: "https://rosebud.global/about",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Rosebud Global",
    description: ABOUT_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return <AboutV2 />;
}
