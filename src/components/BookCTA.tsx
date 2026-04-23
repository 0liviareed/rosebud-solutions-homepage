"use client";

import Lenis from "lenis";

/**
 * BookCTA — inline editorial link that smooth-scrolls to the booking
 * calendar (#rb-book). Uses the global Lenis instance exposed by
 * Runtime so smoothing matches the rest of the page; falls back to
 * scrollIntoView if Lenis isn't available (reduced-motion users).
 *
 * Visual family with BookDemoCTA: same drawn-arrow, same underline
 * logic — scaled down for mid-page moments rather than pedestal.
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
    <div className="rb-book-link-wrap">
      <a
        href="#rb-book"
        className="rb-book-link"
        onClick={handleClick}
      >
        <span className="rb-book-link-label">{label}</span>
        <span className="rb-book-link-arrow" aria-hidden="true">
          <svg viewBox="0 0 36 12" width="36" height="12">
            <path
              className="rb-book-link-shaft"
              d="M0 6 L28 6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="rb-book-link-head"
              d="M22 1.5 L28 6 L22 10.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
        <span className="rb-book-link-underline" aria-hidden="true" />
      </a>
    </div>
  );
}
