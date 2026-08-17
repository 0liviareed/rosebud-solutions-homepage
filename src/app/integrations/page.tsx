import type { Metadata } from "next";
import IntegrationsPage from "@/components/redesign/IntegrationsPage";

export const metadata: Metadata = {
  title: { absolute: "Integrations | Rosebud Solutions" },
  description:
    "Rosebud connects to the CRM, calendar and messaging you already run — Zoho, Google Calendar, Cal.com, Brevo, Twilio and more. No rip-and-replace.",
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
