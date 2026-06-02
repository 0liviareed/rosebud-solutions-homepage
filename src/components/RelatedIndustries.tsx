import Link from "next/link";

export type RelatedItem = {
  href: string;
  title: string;
  desc: string;
};

/**
 * Compact "Related industries" rail that sits at the foot of each
 * industry page, after the FAQ. Lets a real-estate page point to the
 * trades page (and the mortgage / insurance pages) for the adjacencies
 * a buyer would naturally explore next, and gives the new pages an
 * internal-link source other than the global nav.
 *
 * Designed to read as a quiet editorial sidebar — eyebrow + a small
 * tile grid, matching the page's existing rb-eyebrow / rb-label scale.
 */
export default function RelatedIndustries({ items }: { items: RelatedItem[] }) {
  if (!items.length) return null;
  return (
    <section
      className="rb-sec rb-sec-related"
      aria-label="Related industries"
    >
      <div className="rb-wrap">
        <p className="rb-eyebrow">
          <span className="rb-num">·</span>Also in this space
        </p>
        <ul className="rb-related-grid">
          {items.map((item) => (
            <li key={item.href} className="rb-related-item">
              <Link href={item.href} className="rb-related-tile">
                <span className="rb-related-tile-title">{item.title}</span>
                <span className="rb-related-tile-desc">{item.desc}</span>
                <span className="rb-related-tile-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
