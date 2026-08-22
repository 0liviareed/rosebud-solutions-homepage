import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceArticlePage from "@/components/redesign/ResourceArticlePage";
import { RESOURCES } from "@/components/redesign/resourcesData";

export function generateStaticParams() {
  return Object.keys(RESOURCES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = RESOURCES[slug];
  if (!data) return {};
  const url = `https://rosebud.global/resources/${slug}`;
  const title = data.metaTitle ?? data.title;
  const description = data.metaDescription ?? data.dek;
  const images = [data.ogImage ?? `/resources/${slug}/opengraph-image`];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = RESOURCES[slug];
  if (!data) notFound();

  const faqBlock = data.body.find((b) => b.type === "faq");
  const faqNode = faqBlock && faqBlock.type === "faq"
    ? {
        "@type": "FAQPage",
        mainEntity: faqBlock.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  // Every resource has a `date`, so this node is unconditional — previously
  // there was no schema node carrying datePublished/dateModified for any
  // resource at all. `dateModified` defaults to `date` and only needs
  // setting explicitly on an entry once real content changes after publish.
  const webPageNode = {
    "@type": "WebPage",
    name: data.metaTitle ?? data.title,
    description: data.metaDescription ?? data.dek,
    url: `https://rosebud.global/resources/${slug}`,
    datePublished: data.date,
    dateModified: data.dateModified ?? data.date,
  };

  const graph = [webPageNode, ...(faqNode ? [faqNode] : []), ...(data.extraSchema ?? [])];
  const schema = graph.length > 0 ? { "@context": "https://schema.org", "@graph": graph } : null;

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <ResourceArticlePage data={data} />
    </>
  );
}
