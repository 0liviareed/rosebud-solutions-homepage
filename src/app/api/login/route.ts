import { NextResponse } from 'next/server';

// Mirrors middleware.ts — HMAC-SHA256(DEMO_PASSWORD, "demo-auth") hex-encoded.
// Kept as a duplicate (rather than imported) so this route stays drop-in
// portable with the middleware contract. If the salt string ever changes,
// change it in both places at once.
async function expectedToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode('demo-auth'));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(request: Request) {
  const correct = process.env.DEMO_PASSWORD;
  if (!correct) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  if (!body.password || body.password !== correct) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const token = await expectedToken(correct);
  const response = NextResponse.json({ ok: true });
  response.cookies.set('demo-auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    // No `domain` set: cookie scoped to the host that issued it
    // (engine.rosebud.global), can't leak to the apex.
  });
  return response;
}
