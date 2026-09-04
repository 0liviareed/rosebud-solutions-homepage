import { NextResponse } from "next/server";
import { checkBotId } from "@/lib/botid-shim";
import { sendCalculatorResult } from "@/lib/email";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Wasted lead spend calculator — "Email it to me". Sends the visitor their
 * own figures and posts a Telegram notice for visibility. Deliberately does
 * NOT sync into dialler's pipeline_deals like /api/resources/bid-template
 * does — that pipeline puts someone into the active cold-call rotation,
 * which is the wrong weight for "I wanted a copy of my own numbers".
 *
 * Env: RESEND_API_KEY (already set), TELEGRAM_BOT_TOKEN /
 * TELEGRAM_WARROOM_CHAT_IDS (already set, reused from bid-template).
 */

type Body = {
  email?: string;
  currency?: string;
  spend?: number;
  leads?: number;
  replyOutOfTen?: number;
  customerValue?: number | null;
  closeOutOfTen?: number | null;
  source?: string;
};

function bad(detail: string) {
  return NextResponse.json({ error: detail }, { status: 400 });
}

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

async function fireTelegram(email: string, wasted: number, currency: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_WARROOM_CHAT_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || chats.length === 0) return;
  const msg = `Wasted lead spend calculator — breakdown emailed to ${email} (${currency}${Math.round(wasted)}/mo wasted)`;
  await Promise.all(
    chats.map(async (chatId) => {
      try {
        const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: msg }),
        });
        if (!r.ok) console.error(`[calculator-result] telegram send to ${chatId} failed status=${r.status}`);
      } catch (e) {
        console.error(`[calculator-result] telegram send to ${chatId} threw:`, e instanceof Error ? e.message : String(e));
      }
    })
  );
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
  const spend = Math.max(0, Number(body.spend) || 0);
  const leads = Math.max(1, Number(body.leads) || 1);
  const replyOutOfTen = Math.min(10, Math.max(1, Number(body.replyOutOfTen) || 3));
  const currency = body.currency === "£" ? "£" : "$";
  const customerValue = body.customerValue ? Math.max(0, Number(body.customerValue)) : null;
  const closeOutOfTen = body.closeOutOfTen ? Math.min(10, Math.max(1, Number(body.closeOutOfTen))) : null;
  const email = body.email.trim();

  const sendResult = await sendCalculatorResult({ email, currency, spend, leads, replyOutOfTen, customerValue, closeOutOfTen });
  if (!sendResult.ok) {
    console.error("[calculator-result] email send failed:", sendResult.error);
    return NextResponse.json({ error: "Couldn't send that. Please try again, or email contact@rosebud.global." }, { status: 500 });
  }

  const wasted = spend * (1 - replyOutOfTen / 10);
  await fireTelegram(email, wasted, currency);

  return NextResponse.json({ ok: true });
}
