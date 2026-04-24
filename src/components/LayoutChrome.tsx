"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Runtime from "./Runtime";
import FloatingPaths from "./FloatingPaths";

/**
 * Routes that opt out of the global editorial chrome — header nav,
 * footer, Runtime (Lenis + hiker + observers + atmosphere). Useful for
 * standalone landing pages with their own self-contained design
 * system (e.g. the Jay Okojie waitlist).
 */
const BARE_ROUTES: readonly string[] = ["/jay-waitlist"];

function isBareRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return BARE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
}

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (isBareRoute(pathname)) return <>{children}</>;

  return (
    <>
      <Header />
      <Runtime />
      <FloatingPaths id="rb-atmo-1" position={1.2} />
      <FloatingPaths id="rb-atmo-2" position={-0.6} />
      <FloatingPaths id="rb-atmo-3" position={1.8} />
      {children}
      <Footer />
    </>
  );
}
