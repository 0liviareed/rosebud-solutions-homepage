import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Lightweight external health check for rosebud.global (marketing site).
 *
 * Pinged by an external uptime monitor (UptimeRobot). Confirms the app runtime
 * is up AND Supabase is reachable with a WORKING key — the failure mode (dead
 * service-role key) that silently 401'd the stack. 200 healthy / 503 degraded.
 */

const TIMEOUT_MS = 5000;

export async function GET() {
  const started = Date.now();
  const checks: Record<string, string> = {};
  let ok = true;

  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    checks.supabase = "misconfigured";
    ok = false;
  } else {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const res = await fetch(`${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        signal: ctrl.signal,
        cache: "no-store",
      });
      clearTimeout(t);
      if (res.ok) {
        checks.supabase = "ok";
      } else {
        checks.supabase = `fail:${res.status}`;
        ok = false;
      }
    } catch {
      checks.supabase = "fail";
      ok = false;
    }
  }

  return NextResponse.json(
    { ok, checks, ts: new Date().toISOString(), latency_ms: Date.now() - started },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
