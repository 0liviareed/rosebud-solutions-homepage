"use client";

import Lenis from "lenis";

/**
 * BookCTA — an editorial link that smooth-scrolls to the booking
 * calendar (#rb-book). Uses the global Lenis instance exposed by
 * Runtime so smoothing matches the rest of the page; falls back to
 * scrollIntoView if Lenis isn't available (reduced-motion users).
 */
export default function BookCTA({
  label = "Book a call",
}: {
  label?: string;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const target = document.getElementById("rb-book");
    if (!target) return;
    const lenis = (window as unknown as { __rbLenis?: Lenis | null }).__rbLenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -40, duration: 1.6 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="rb-book-cta-wrap">
      <a
        href="#rb-book"
        className="rb-book-cta"
        onClick={handleClick}
      >
        <span>{label}</span>
        <span className="rb-book-cta-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
