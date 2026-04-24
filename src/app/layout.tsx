import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Sora,
  Unbounded,
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

/* Bold modern brand display — used for the Jay waitlist + founders-stack
   display headlines, price, and numerals. Playful geometric sans with
   distinct character; reads as modern brand rather than template SaaS.
   Variable name kept as --font-editorial for downstream continuity. */
const unbounded = Unbounded({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${cormorant.variable} ${dmSans.variable} ${sora.variable} ${unbounded.variable}`}
    >
      <body>
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
