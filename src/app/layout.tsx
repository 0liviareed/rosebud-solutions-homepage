import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
