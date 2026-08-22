import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  DM_Mono,
  Sora,
  Outfit,
  JetBrains_Mono,
} from "next/font/google";
import LayoutChrome from "@/components/LayoutChrome";
import { BotIdClient } from "botid/client";
import { Analytics } from "@vercel/analytics/next";

// Vercel BotID — invisible bot protection. Instruments the client so the matching
// server routes can verify with checkBotId(). Protects the abusable POST endpoints.
const BOTID_PROTECTED = [
  { path: "/api/signup", method: "POST" },
  { path: "/api/checkout/session", method: "POST" },
  { path: "/api/pricing/enquiry", method: "POST" },
  { path: "/api/careers/sdr", method: "POST" },
  { path: "/api/login", method: "POST" },
  { path: "/api/app/login", method: "POST" },
];
import { SpeedInsights } from "@vercel/speed-insights/next";
import PostHogProvider from "@/components/PostHogProvider";
import CookieBanner from "@/components/CookieBanner";
import { Suspense } from "react";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Bold modern brand display — used for the Jay waitlist + founders-stack
   display headlines, price, and numerals. Closest free Google Fonts
   match to the Gilroy family: clean geometric sans, full weight range,
   bold weights read confident rather than industrial. Variable name
   kept as --font-editorial for downstream continuity. */
const outfit = Outfit({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* Mono used for small all-caps labels on the engine demo dashboard + the
   gated login page. Loaded by name (the login page CSS module references
   'JetBrains Mono' explicitly) — falls back to system monospace if absent. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* Mono used by the engine.rosebud.global demo's own design tokens
   (--mono) — loaded so /app/* (the real client console) can match it
   exactly rather than substituting JetBrains Mono. */
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rosebud.global"),
  title: {
    default: "Customer Communication Platform for Service Businesses | Rosebud",
    template: "%s | Rosebud Global",
  },
  description:
    "Rosebud answers every inbound inquiry in seconds, qualifies it against your rules, and books it into your calendar. Operated for you, across every channel.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Customer Communication Platform for Service Businesses | Rosebud",
    description:
      "Rosebud answers every inbound inquiry in seconds, qualifies it against your rules, and books it into your calendar. Operated for you, across every channel.",
    url: "https://rosebud.global",
    siteName: "Rosebud Global",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Communication Platform for Service Businesses | Rosebud",
    description:
      "Rosebud answers every inbound inquiry in seconds, qualifies it against your rules, and books it into your calendar. Operated for you, across every channel.",
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rosebud Global Ltd",
  alternateName: ["Rosebud Solutions", "Rosebud Global", "Rosebud"],
  url: "https://rosebud.global",
  logo: "https://rosebud.global/rosebud-icon.png",
  description:
    "Rosebud Solutions is the operated intake layer for owner-operated businesses — it answers every inquiry in seconds, qualifies and books it against the business's own rules, and connects to the CRM and calendars they already use. Rosebud Global Ltd builds and operates the system rather than licensing software.",
  foundingDate: "2025",
  founders: [
    {
      "@type": "Person",
      name: "Anselm Jr. Okojie",
      jobTitle: "Co-founder & CEO",
    },
    {
      "@type": "Person",
      name: "Sajni Okojie",
      jobTitle: "Co-founder & COO",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "contact@rosebud.global",
  },
  sameAs: [
    "https://www.linkedin.com/company/rosebud-solution/",
    "https://www.linkedin.com/company/rosebud-global/",
    "https://www.instagram.com/rosebudglobal/",
    "https://x.com/rosebudsolution",
    "https://www.tiktok.com/@rosebudsolutions",
    "https://find-and-update.company-information.service.gov.uk/company/16623472",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rosebud Global",
  url: "https://rosebud.global",
  inLanguage: "en-US",
  description:
    "Rosebud answers every inbound inquiry in seconds, qualifies it against your rules, and books it into your calendar. Operated for you, across every channel.",
  publisher: { "@type": "Organization", name: "Rosebud Global Ltd" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      className={`${cormorant.variable} ${dmSans.variable} ${sora.variable} ${outfit.variable} ${jetbrainsMono.variable} ${dmMono.variable}`}
    >
      <head>
        <BotIdClient protect={BOTID_PROTECTED} />
      </head>
      <body>
        <a href="#rb-main" className="rb-skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_SCHEMA),
          }}
        />
        <LayoutChrome>{children}</LayoutChrome>
        <Suspense fallback={null}>
          <PostHogProvider />
        </Suspense>
        <Analytics />
        <SpeedInsights />
        <CookieBanner />
      </body>
    </html>
  );
}
