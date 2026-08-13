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
  return {
    title: `${data.title} — Rosebud Solutions`,
    description: data.dek,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = RESOURCES[slug];
  if (!data) notFound();

  const faqBlock = data.body.find((b) => b.type === "faq");
  const faqSchema = faqBlock && faqBlock.type === "faq"
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqBlock.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  return (
    <>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ResourceArticlePage data={data} />
    </>
  );
}
