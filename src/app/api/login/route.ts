import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkBotId } from 'botid/server';

/*
 * engine.rosebud.global login — mirrors the warroom auth contract.
 *
 * Same DASHBOARD_PASSWORD + DASHBOARD_TOTP_SECRET env vars as the war-room
 * Vercel project, same wr_auth cookie name, same value semantics (the
 * password is stored in the cookie directly; the middleware compares it
 * back against DASHBOARD_PASSWORD).
 *
 * If both env vars are set to the same values across the war-room and
 * rosebud-solutions-homepage projects, a single password + TOTP works
 * across both surfaces.
 */

const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(s: string): Buffer {
  const clean = s.replace(/=+$/, '').toUpperCase();
  let bits = '';
  for (const ch of clean) {
    const v = BASE32.indexOf(ch);
    if (v < 0) throw new Error('Invalid base32 character');
    bits += v.toString(2).padStart(5, '0');
  }
  const out: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    out.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(out);
}

function hotp(secret: Buffer, counter: number): string {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const hmac = crypto.createHmac('sha1', secret).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const bin =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return (bin % 1_000_000).toString().padStart(6, '0');
}

function verifyTotp(code: string, secret: string, window = 1): boolean {
  if (!/^\d{6}$/.test(code)) return false;
  let secretBuf: Buffer;
  try {
    secretBuf = base32Decode(secret);
  } catch {
    return false;
  }
  const counter = Math.floor(Date.now() / 30_000);
  for (let i = -window; i <= window; i++) {
    const expected = hotp(secretBuf, counter + i);
    if (
      expected.length === code.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(code))
    ) {
      return true;
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  const bot = await checkBotId();
  if (bot.isBot) return NextResponse.json({ ok: false, reason: 'blocked' }, { status: 403 });

  let body: { password?: string; code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad_body' }, { status: 400 });
  }

  const { password, code } = body;
  // Trim env vars defensively — shell-piped `vercel env add` leaves a trailing
  // newline that would otherwise crash base32 decode and silently 401 every
  // login.
  const expectedPassword = (process.env.DASHBOARD_PASSWORD ?? '').replace(/\s+$/g, '');
  const totpSecret = (process.env.DASHBOARD_TOTP_SECRET ?? '').replace(/\s+$/g, '');

  if (!expectedPassword || !totpSecret) {
    return NextResponse.json(
      { ok: false, reason: 'server_misconfigured' },
      { status: 500 },
    );
  }

  if (!password || password !== expectedPassword) {
    return NextResponse.json({ ok: false, reason: 'bad_password' }, { status: 401 });
  }

  if (!code || !verifyTotp(code, totpSecret)) {
    return NextResponse.json({ ok: false, reason: 'bad_code' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('wr_auth', password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
