import type { Metadata } from "next";
import ResourcesLibraryPage from "@/components/redesign/ResourcesLibraryPage";

export const metadata: Metadata = {
  title: "The Enquiry Library — Rosebud Solutions",
  description: "Guides, templates and research on capturing, qualifying, booking and keeping every enquiry your marketing pays for.",
};

export default function Page() {
  return <ResourcesLibraryPage />;
}
