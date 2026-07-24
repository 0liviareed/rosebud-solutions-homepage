"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Runtime from "./Runtime";
import FloatingPaths from "./FloatingPaths";

/**
 * Routes that opt out of ALL global chrome — header nav, footer,
 * Runtime (Lenis + hiker + observers + atmosphere). Useful for
 * standalone landing pages with their own self-contained design
 * system (e.g. the Jay Okojie waitlist).
 */
const BARE_ROUTES: readonly string[] = [
  "/jay-waitlist",
  "/founders-stack",
  "/capabilities",
  "/about",
  "/pricing",
  "/checkout",
  "/onboarding",
  // Industry pages ported to the redesign template ship their own RedesignNav/Footer
  // — add each slug here as it ports (switch to bare "/industries" once all are on
  // the new template). Un-ported pages still rely on the global chrome.
  "/industries/trades-home-services",
  "/industries/family-law",
  "/industries/healthcare",
  "/industries/insurance",
  "/industries/real-estate",
  "/industries/mortgage-lending",
];

/**
 * Routes that get a LIGHT chrome — Header + Footer, but no Runtime
 * (Lenis smooth scroll, hiker overlay, IntersectionObservers, RAF tick)
 * and no FloatingPaths SVG atmosphere. These are the heaviest mobile
 * costs across the site; long-form content pages like job listings
 * and application forms don't need them. Keeping Header + Footer
 * preserves the global navigation contract for the user.
 */
const LITE_ROUTES: readonly string[] = [
  "/careers",
];

function isBareRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  // Homepage redesign (tool launch) ships its own nav + self-contained scroll
  // choreography — opt it out of global Header/Footer + Runtime.
  if (pathname === "/") return true;
  return BARE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
}

function isLiteRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return LITE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
}

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (isBareRoute(pathname)) {
    return (
      <div id="rb-main" tabIndex={-1}>
        {children}
      </div>
    );
  }

  if (isLiteRoute(pathname)) {
    return (
      <>
        <Header />
        <div id="rb-main" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Runtime />
      <FloatingPaths id="rb-atmo-1" position={1.2} />
      <FloatingPaths id="rb-atmo-2" position={-0.6} />
      <FloatingPaths id="rb-atmo-3" position={1.8} />
      <div id="rb-main" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
}
