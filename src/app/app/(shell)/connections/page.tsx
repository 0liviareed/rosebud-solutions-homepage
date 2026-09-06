import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Connections moved under Settings (v9 nav has no Connections item). Old
// links, bookmarks and the OAuth callbacks that still target /connections
// land here and are forwarded with their query intact (?connected= / ?error=).
export default async function LegacyConnectionsRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === "string") qs.set(k, v);
    else if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
  }
  const q = qs.toString();
  redirect(q ? `/settings/connections?${q}` : "/settings/connections");
}
