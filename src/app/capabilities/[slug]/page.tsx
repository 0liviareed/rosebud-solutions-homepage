import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CapabilityPage from "@/components/redesign/CapabilityPage";
import { CAPABILITIES } from "@/components/redesign/capabilityData";

export function generateStaticParams() {
  return Object.keys(CAPABILITIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = CAPABILITIES[slug];
  if (!data) return {};
  const title = `Rosebud for ${data.name}`;
  return {
    title,
    description: data.metaDescription,
    alternates: { canonical: `/capabilities/${slug}` },
    openGraph: {
      title,
      description: data.metaDescription,
      url: `https://rosebud.global/capabilities/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: data.metaDescription,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = CAPABILITIES[slug];
  if (!data) notFound();
  return <CapabilityPage data={data} />;
}
