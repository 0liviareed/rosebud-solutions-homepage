import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { readSecret, updateSecret } from "@/lib/connections/secrets";
import { getProvider } from "@/lib/connections/providers";
import type { OAuthTokens } from "@/lib/connections/providers/registry";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Scheduled re-validation of every active connection (plan §7 / v3 doc
// §5's "connections.health" job). Cadence is set in vercel.json, not here —
// treat it as a config value, not an assumption baked into this route.
//
// expired = a refresh was attempted and the provider rejected it (client
//   can recover by reconnecting through the normal OAuth flow).
// broken  = misconfigured or the connection can't be validated at all
//   (e.g. revoked access, no refresh_token stored).

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Fail closed — same posture as the DASHBOARD_PASSWORD check in
    // middleware.ts: a missing/wrong secret locks the job out entirely
    // rather than silently no-op'ing.
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = appSupabaseAdmin();
  const { data: connections, error } = await admin
    .from("connections")
    .select("id, category, provider, secret_ref, status, health_reason")
    .eq("status", "active");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // WhatsApp connections sit at status=pending with an "IN_REVIEW:" marker
  // while Meta reviews the number (see whatsapp/complete/route.ts) — not
  // `active`, so the query above misses them. This job is also the thing
  // that's supposed to flip them to active once Meta clears the number,
  // per §5.1: "health job flips status = active on its own, no further
  // client action" — so they need their own pass, checked separately from
  // the re-validate-active loop below (different transition: pending→active
  // here, vs active→expired/broken there).
  const { data: inReview } = await admin
    .from("connections")
    .select("id, category, provider, secret_ref, status, health_reason")
    .eq("status", "pending")
    .like("health_reason", "IN_REVIEW:%");

  const results = { checked: 0, ok: 0, expired: 0, broken: 0, activated: 0 };

  for (const connection of inReview ?? []) {
    results.checked += 1;
    const adapter = (() => {
      try {
        return getProvider(`${connection.category}:${connection.provider}`);
      } catch {
        return null;
      }
    })();
    if (!adapter) continue;

    const secret = await readSecret<Record<string, unknown>>(connection.secret_ref);
    if (!secret) continue;

    const testResult = await adapter.test(secret);
    if (testResult.healthy) {
      await admin
        .from("connections")
        .update({ status: "active", health_reason: null, last_health_check: new Date().toISOString() })
        .eq("id", connection.id);
      results.activated += 1;
    } else {
      // Still in review (or a real problem) — leave status=pending and
      // refresh the reason so a genuinely new failure isn't masked behind
      // the stale "IN_REVIEW" text forever.
      await admin
        .from("connections")
        .update({ health_reason: `IN_REVIEW: ${testResult.reason ?? "still pending Meta review"}`, last_health_check: new Date().toISOString() })
        .eq("id", connection.id);
    }
  }

  for (const connection of connections ?? []) {
    results.checked += 1;

    const adapter = (() => {
      try {
        return getProvider(`${connection.category}:${connection.provider}`);
      } catch {
        return null;
      }
    })();
    if (!adapter) continue; // unknown provider — leave status alone, nothing to validate against

    const secret = await readSecret<OAuthTokens>(connection.secret_ref);
    if (!secret) {
      await admin
        .from("connections")
        .update({ status: "broken", health_reason: "No credential stored", last_health_check: new Date().toISOString() })
        .eq("id", connection.id);
      results.broken += 1;
      continue;
    }

    let current = secret;
    let refreshFailed = false;
    if (adapter.refresh && current.refresh_token) {
      try {
        const refreshed = await adapter.refresh(current);
        current = { ...current, ...refreshed };
        if (connection.secret_ref) await updateSecret(connection.secret_ref, current);
      } catch {
        refreshFailed = true;
      }
    }

    if (refreshFailed) {
      await admin
        .from("connections")
        .update({
          status: "expired",
          health_reason: "Token refresh was rejected by the provider — reconnect required",
          last_health_check: new Date().toISOString(),
        })
        .eq("id", connection.id);
      results.expired += 1;
      continue;
    }

    const testResult = await adapter.test(current);
    if (testResult.healthy) {
      await admin
        .from("connections")
        .update({ last_health_check: new Date().toISOString(), health_reason: null })
        .eq("id", connection.id);
      results.ok += 1;
    } else {
      await admin
        .from("connections")
        .update({
          status: "broken",
          health_reason: testResult.reason ?? "Health check failed",
          last_health_check: new Date().toISOString(),
        })
        .eq("id", connection.id);
      results.broken += 1;
    }
  }

  return NextResponse.json(results);
}
