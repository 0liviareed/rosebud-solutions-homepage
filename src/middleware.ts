import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ENGINE_HOST = 'engine.rosebud.global';

/**
 * HMAC-SHA256(DEMO_PASSWORD, "demo-auth") — hex-encoded.
 * Same scheme used by /api/login when issuing the cookie. Computed via the
 * Web Crypto API (crypto.subtle) so this works in the Edge runtime middleware
 * runs in. Rotating DEMO_PASSWORD invalidates every active cookie because the
 * recomputed token no longer matches.
 */
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

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const path = request.nextUrl.pathname;

  // Old URL on the apex → redirect to the engine subdomain (matches both
  // /demo and /demo/* so any links already shared keep working).
  if ((host === 'rosebud.global' || host === 'www.rosebud.global') && path.startsWith('/demo')) {
    return NextResponse.redirect('https://engine.rosebud.global/', 301);
  }

  // Only gate the engine subdomain. Everything else (rosebud.global, previews,
  // localhost) is unaffected — local dev intentionally bypasses the gate.
  if (host !== ENGINE_HOST) {
    return NextResponse.next();
  }

  // engine.rosebud.global is not an SEO target — serve a restrictive robots
  // here regardless of what public/robots.txt says for the apex.
  if (path === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // Allow the login flow, Next.js internals, and Let's Encrypt's HTTP-01
  // challenge through unconditionally. The ACME path matters: Vercel hits
  // /.well-known/acme-challenge/<token> on the host to issue/renew the
  // SSL cert; if the gate redirects that to /login the cert never issues
  // (silent SSL-pending — the symptom that bit us on first deploy).
  if (
    path === '/login' ||
    path === '/api/login' ||
    path.startsWith('/_next/') ||
    path.startsWith('/static/') ||
    path.startsWith('/.well-known/') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const password = process.env.DEMO_PASSWORD;
  if (!password) {
    // Fail-secure: env missing locks everyone out (including the operator)
    // rather than silently letting requests through.
    return new NextResponse('Service temporarily unavailable', { status: 503 });
  }

  const cookie = request.cookies.get('demo-auth')?.value;
  const expected = await expectedToken(password);

  if (cookie !== expected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Authed users land on engine.rosebud.global/ — rewrite to the dashboard
  // route internally so the URL bar stays clean.
  if (path === '/') {
    return NextResponse.rewrite(new URL('/demo', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
