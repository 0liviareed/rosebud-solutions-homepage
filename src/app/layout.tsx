import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Sora,
  Outfit,
} from "next/font/google";
import LayoutChrome from "@/components/LayoutChrome";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteBeacon from "@/components/SiteBeacon";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://rosebud.global"),
  title: {
    default: "Rosebud Global — Custom AI Systems for SME Operations",
    template: "%s | Rosebud Global",
  },
  description:
    "UK business systems consultancy. We build and run custom AI systems that replace founder-dependent work. Deployed in 5 weeks.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rosebud Global — Custom AI Systems for SME Operations",
    description:
      "UK business systems consultancy. We build and run custom AI systems that replace founder-dependent work. Deployed in 5 weeks.",
    url: "https://rosebud.global",
    siteName: "Rosebud Global",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosebud Global — Custom AI Systems for SME Operations",
    description:
      "We build and run custom AI systems that replace founder-dependent work. Deployed in 5 weeks.",
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
    "UK business systems consultancy building custom AI systems that replace founder-dependent operational work.",
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
    "https://www.linkedin.com/company/rosebudglobal/",
    "https://www.instagram.com/rosebud.global/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${dmSans.variable} ${sora.variable} ${outfit.variable}`}
    >
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
        <LayoutChrome>{children}</LayoutChrome>
        <Suspense fallback={null}>
          <SiteBeacon />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
