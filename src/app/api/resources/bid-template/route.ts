import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { sendResourceDownload } from "@/lib/email";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Resource lead-magnet capture. One handler for any gated download on
 * /resources/[slug] — `resourceKey` in the request body selects which files
 * to send (see FILES below). Emails the files, then syncs into war-room's
 * pipeline_deals (dialler/app/api/leads/resource-capture) so it's a real,
 * visible lead rather than sitting in an isolated table — same architecture
 * as /api/checkout/capture's syncToDialler. Confirmed 2026-08-13: land in
 * pipeline_deals, not the cold `leads` dialler queue, since a resource
 * download shouldn't put someone in the active cold-call rotation.
 *
 * Env: RESEND_API_KEY (already set), DIALLER_CHECKOUT_SYNC_SECRET (already
 * set — reused, not a new secret), TELEGRAM_BOT_TOKEN /
 * TELEGRAM_WARROOM_CHAT_IDS (already set).
 */

const FILES: Record<string, { title: string; files: { label: string; url: string }[] }> = {
  "cleaning-bid-template": {
    title: "The Janitorial Bid Template",
    files: [
      { label: "Download the pricing worksheet (.xlsx)", url: "/downloads/cleaning-bid-template/janitorial-bid-worksheet.xlsx" },
      { label: "Download the bid document (.docx)", url: "/downloads/cleaning-bid-template/janitorial-bid-document.docx" },
    ],
  },
};

type Body = { email?: string; resourceKey?: string; sourceSlug?: string };

function bad(detail: string) {
  return NextResponse.json({ error: detail }, { status: 400 });
}

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

async function fireTelegram(email: string, resourceKey: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_WARROOM_CHAT_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || chats.length === 0) return;
  const msg = `Resource download requested: ${resourceKey} — ${email}`;
  await Promise.all(
    chats.map(async (chatId) => {
      try {
        const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: msg }),
        });
        if (!r.ok) console.error(`[bid-template] telegram send to ${chatId} failed status=${r.status}`);
      } catch (e) {
        console.error(`[bid-template] telegram send to ${chatId} threw:`, e instanceof Error ? e.message : String(e));
      }
    })
  );
}

// Awaited (not fire-and-forget) — same reasoning as checkout/capture's
// syncToDialler: Vercel can terminate the function once the response is
// sent, which would silently drop an un-awaited fetch. Never lets a sync
// failure affect this route's own ok/fail result — the email already sent
// is the thing the user is waiting on.
async function syncToDialler(email: string, resourceKey: string, resourceTitle: string, sourceSlug: string) {
  const secret = process.env.DIALLER_CHECKOUT_SYNC_SECRET;
  if (!secret) { console.error("[bid-template] DIALLER_CHECKOUT_SYNC_SECRET not set — dialler sync skipped"); return; }
  try {
    const res = await fetch("https://dialler.rosebud.global/api/leads/resource-capture", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, resource_key: resourceKey, resource_title: resourceTitle, source_slug: sourceSlug }),
    });
    if (!res.ok) console.error("[bid-template] dialler sync non-ok:", res.status, await res.text().catch(() => ""));
  } catch (e) {
    console.error("[bid-template] dialler sync failed:", e instanceof Error ? e.message : String(e));
  }
}

export async function POST(req: Request) {
  const bot = await checkBotId();
  if (bot.isBot) return NextResponse.json({ error: "Request blocked." }, { status: 403 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid JSON body");
  }

  if (!body.email || !validEmail(body.email)) return bad("A valid email address is required");
  const resource = body.resourceKey ? FILES[body.resourceKey] : undefined;
  if (!resource) return bad("Unknown resource");

  const email = body.email.trim();
  const sendResult = await sendResourceDownload({ email, resourceTitle: resource.title, files: resource.files });
  if (!sendResult.ok) {
    console.error("[bid-template] email send failed:", sendResult.error);
    return NextResponse.json({ error: "Couldn't send the files. Please try again, or email contact@rosebud.global." }, { status: 500 });
  }

  await syncToDialler(email, body.resourceKey!, resource.title, body.sourceSlug ?? "");
  await fireTelegram(email, body.resourceKey!);

  return NextResponse.json({ ok: true });
}
