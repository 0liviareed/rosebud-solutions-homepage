import type { Metadata } from "next";
import ResourcesLibraryPage from "@/components/redesign/ResourcesLibraryPage";
import { RESOURCES } from "@/components/redesign/resourcesData";

const TITLE = "The Inquiry Library | Rosebud Solutions";
const DESCRIPTION = "Guides, templates and research on capturing, qualifying, booking and keeping every inquiry your marketing pays for.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/resources" },
  openGraph: {
    // Previously "The Inquiry Library" with no images field — dropped the
    // brand suffix the real <title> carries, and the missing images field
    // suppressed the file-convention default og:image entirely rather than
    // falling back to it, so the share card had no image at all.
    title: TITLE,
    description: DESCRIPTION,
    url: "https://rosebud.global/resources",
    type: "website",
    images: ["/resources/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/resources/opengraph-image"],
  },
};

const resourceList = Object.values(RESOURCES);
const latestModified = resourceList.reduce(
  (max, r) => ((r.dateModified ?? r.date) > max ? r.dateModified ?? r.date : max),
  resourceList[0]?.date ?? "2026-08-01"
);

const COLLECTION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: "https://rosebud.global/resources",
  dateModified: latestModified,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: resourceList.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://rosebud.global/resources/${r.slug}`,
      name: r.metaTitle ?? r.title,
    })),
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_SCHEMA) }} />
      <ResourcesLibraryPage />
    </>
  );
}
