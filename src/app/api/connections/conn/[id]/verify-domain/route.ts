import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "dns";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { readSecret } from "@/lib/connections/secrets";

export const dynamic = "force-dynamic";

// §5.1: "If the domain is not yet verified on the ESP, the card shows the
// records to add and rechecks" / plain SMTP: "Server verifies SPF / DKIM on
// the domain." This route checks SPF only, honestly — DKIM verification
// needs a provider-specific selector/CNAME target (Brevo/Mailgun/SendGrid
// each hand the client different records to add) that isn't knowable from a
// generic DNS lookup. Rather than fake a DKIM pass, `dkim` in the response
// is always `"not_checked"` with an explanatory reason, matching this repo's
// established "an honest 'coming soon' beats a polished number that's
// actually static" standard (BUILD_MAP.md's own framing).
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;

  const admin = appSupabaseAdmin();
  const { data: connection } = await admin
    .from("connections")
    .select("id, org_id, secret_ref")
    .eq("id", id)
    .maybeSingle();

  if (!connection || connection.org_id !== auth.orgId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const secret = await readSecret<{ sending_domain?: string }>(connection.secret_ref);
  const domain = secret?.sending_domain;
  if (!domain) {
    return NextResponse.json({ error: "This connection has no sending_domain to verify" }, { status: 400 });
  }

  const missingRecords: string[] = [];
  let spfVerified = false;
  try {
    const records = await dns.resolveTxt(domain);
    spfVerified = records.some((r) => r.join("").toLowerCase().startsWith("v=spf1"));
  } catch {
    // NXDOMAIN or no TXT records at all — treated the same as "not found"
  }
  if (!spfVerified) missingRecords.push("spf");

  return NextResponse.json(
    {
      verified: spfVerified,
      missing_records: missingRecords,
      dkim: "not_checked",
      dkim_reason: "DKIM needs the specific selector/CNAME your email provider issued — check it against their dashboard directly.",
    },
    { headers: response.headers }
  );
}
