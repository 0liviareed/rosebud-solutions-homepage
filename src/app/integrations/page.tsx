import type { Metadata } from "next";
import IntegrationsPage from "@/components/redesign/IntegrationsPage";

export const metadata: Metadata = {
  title: "Integrations — Connect Rosebud to the software you already use | Rosebud Solutions",
  description:
    "Rosebud connects to the CRM, calendar, messaging and industry systems you already run — HubSpot, Salesforce, Zoho, Google Calendar, Cal.com, WhatsApp, Clio, ServiceM8 and more. No second dashboard, no rip-and-replace.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Integrations — Rosebud Solutions",
    description:
      "Connect Rosebud to your CRM, calendar, messaging and the systems built for your trade. We connect to what you already run — and build the system for you if you don't have one.",
    url: "https://rosebud.global/integrations",
    type: "website",
  },
};

export default function Page() {
  return <IntegrationsPage />;
}
