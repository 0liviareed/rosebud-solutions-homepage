import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
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

export const metadata: Metadata = {
  metadataBase: new URL("https://rosebud.global"),
  title: {
    default: "Rosebud Global — Custom AI Systems for SME Operations",
    template: "%s | Rosebud Global",
  },
  description:
    "Rosebud Solutions is the operated intake layer for owner-operated businesses: answer every enquiry in seconds, qualify, book and follow up — run for you, every day, connected to the CRM and calendars you already use.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rosebud Global — Custom AI Systems for SME Operations",
    description:
      "Rosebud Solutions is the operated intake layer for owner-operated businesses: answer every enquiry in seconds, qualify, book and follow up — run for you, every day, connected to the CRM and calendars you already use.",
    url: "https://rosebud.global",
    siteName: "Rosebud Global",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosebud Global — Custom AI Systems for SME Operations",
    description:
      "The operated intake layer for owner-operated businesses: answer every enquiry in seconds, qualify, book and follow up — run for you, every day.",
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
    "Rosebud Solutions is the operated intake layer for owner-operated businesses — it answers every enquiry in seconds, qualifies and books it against the business's own rules, and connects to the CRM and calendars they already use. Rosebud Global Ltd builds and operates the system rather than licensing software.",
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
    "https://www.linkedin.com/company/rosebudglobal",
    "https://www.instagram.com/rosebud.global/",
    "https://www.tiktok.com/@rosebudglobal",
    "https://find-and-update.company-information.service.gov.uk/company/16623472",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rosebud Global",
  url: "https://rosebud.global",
  inLanguage: "en-GB",
  description:
    "Rosebud Solutions is the operated intake and enquiry-handling layer for owner-operated businesses: it answers, qualifies, books and follows up every enquiry, run day to day by Rosebud and connected to the tools the business already uses.",
  publisher: { "@type": "Organization", name: "Rosebud Global Ltd" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${dmSans.variable} ${sora.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
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
