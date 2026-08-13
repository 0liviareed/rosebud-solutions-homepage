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
  return <ResourceArticlePage data={data} />;
}
