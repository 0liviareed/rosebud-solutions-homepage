import type { Metadata } from "next";
import ResourcesLibraryPage from "@/components/redesign/ResourcesLibraryPage";

export const metadata: Metadata = {
  title: { absolute: "The Enquiry Library | Rosebud Solutions" },
  description: "Guides, templates and research on capturing, qualifying, booking and keeping every enquiry your marketing pays for.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "The Enquiry Library",
    description: "Guides, templates and research on capturing, qualifying, booking and keeping every enquiry your marketing pays for.",
    url: "https://rosebud.global/resources",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Enquiry Library",
    description: "Guides, templates and research on capturing, qualifying, booking and keeping every enquiry your marketing pays for.",
  },
};

export default function Page() {
  return <ResourcesLibraryPage />;
}
