import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Pricing enquiry handler. Mirrors the careers form pattern after the
 * 2026-05-29 Brevo retirement.
 *
 * Flow: validate → Supabase insert → await Telegram alert. See
 * feedback_vercel_serverless_await for why we await rather than
 * fire-and-forget.
 *
 * Env (already set in Vercel rosebud-solutions-homepage):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_WARROOM_CHAT_IDS
 */

const INDUSTRY_OPTIONS = new Set([
  "Dental, Aesthetic & Private Healthcare",
  "Mortgage & Lending",
  "Insurance",
  "Real Estate",
  "Recruitment",
  "Enterprise",
  "Other",
]);

type Body = {
  name?: string;
  email?: string;
  industry_interest?: string[];
  request?: string;
  consent?: boolean;
};

function bad(detail: string) {
  return NextResponse.json({ error: detail }, { status: 400 });
}

function nonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function validateArray(input: unknown, allowed: Set<string>): string[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const out: string[] = [];
  for (const item of input) {
    if (typeof item !== "string" || !allowed.has(item)) return null;
    out.push(item);
  }
  return out;
}

async function fireTelegram(name: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_WARROOM_CHAT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chats.length === 0) return;

  const msg = `New pricing enquiry: ${name}`;
  await Promise.all(
    chats.map(async (chatId) => {
      try {
        const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: msg }),
        });
        if (!r.ok) {
          const t = await r.text().catch(() => "");
          console.error(
            `[pricing-enquiry] telegram send to ${chatId} failed status=${r.status} body=${t.slice(0, 200)}`
          );
        }
      } catch (e) {
        console.error(
          `[pricing-enquiry] telegram send to ${chatId} threw:`,
          e instanceof Error ? e.message : String(e)
        );
      }
    })
  );
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid JSON body");
  }

  if (!nonEmptyString(body.name)) return bad("Name is required");
  if (!nonEmptyString(body.email) || !validEmail(body.email))
    return bad("A valid email address is required");
  if (!nonEmptyString(body.request)) return bad("Please tell us about your needs");

  const industries = validateArray(body.industry_interest, INDUSTRY_OPTIONS);
  if (!industries) return bad("Select at least one industry");

  if (!body.consent) return bad("Privacy consent is required");

  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[pricing-enquiry] missing Supabase env");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { error: insertErr } = await supabase.from("pricing_enquiries").insert({
    name: body.name.trim(),
    email: body.email.trim(),
    industry_interest: industries,
    request: body.request.trim(),
    consent: body.consent,
    user_agent: req.headers.get("user-agent") || null,
  });

  if (insertErr) {
    console.error("[pricing-enquiry] insert failed:", insertErr.message);
    return NextResponse.json(
      { error: "Couldn't save your enquiry. Please try again, or email contact@rosebud.global." },
      { status: 500 }
    );
  }

  await fireTelegram(body.name.trim());

  return NextResponse.json({ ok: true });
}
