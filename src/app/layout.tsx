import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Sora,
  Instrument_Serif,
} from "next/font/google";
import LayoutChrome from "@/components/LayoutChrome";
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

/* Editorial display serif — used for the Jay waitlist + founders-stack
   display headlines + price so they read as publication-grade rather
   than SaaS-template. Italic is crucial for the emphasis moments. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rosebud Solutions | Scale Faster with AI Automation",
  description:
    "Rosebud Solutions helps consumers and businesses scale using AI automation — without increasing headcount.",
  openGraph: {
    title: "Rosebud Solutions | Scale Faster with AI Automation",
    description:
      "Rosebud Solutions helps consumers and businesses scale using AI automation — without increasing headcount.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rosebud Solutions | Scale Faster with AI Automation",
    description:
      "Rosebud Solutions helps consumers and businesses scale using AI automation — without increasing headcount.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${sora.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
