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
  const description = data.metaDescription ?? data.dek;
  return {
    title: { absolute: data.metaTitle ?? `${data.title} | Rosebud Solutions` },
    description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: data.title,
      description,
      url,
      type: "article",
      locale: "en_US",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description,
      images: ["/opengraph-image"],
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

  const graph = [...(faqNode ? [faqNode] : []), ...(data.extraSchema ?? [])];
  const schema = graph.length > 0 ? { "@context": "https://schema.org", "@graph": graph } : null;

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <ResourceArticlePage data={data} />
    </>
  );
}
