import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ENGINE_HOST = 'engine.rosebud.global';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const path = request.nextUrl.pathname;

  // Old URL on the apex → redirect to the engine subdomain (matches both
  // /demo and /demo/* so any links already shared keep working).
  if ((host === 'rosebud.global' || host === 'www.rosebud.global') && path.startsWith('/demo')) {
    return NextResponse.redirect('https://engine.rosebud.global/', 301);
  }

  // The recruitment industry page has been permanently removed. Return 410 Gone
  // (not 404) so search engines drop it from the index rather than keep retrying.
  // Applies on every host, ahead of the engine gate.
  if (path === '/industries/recruitment' || path.startsWith('/industries/recruitment/')) {
    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Gone</title></head><body style="font-family:system-ui,-apple-system,sans-serif;max-width:34rem;margin:16vh auto;padding:0 1.5rem;color:#17131F"><h1 style="font-weight:600;font-size:1.6rem;margin:0 0 .6rem">410 — Gone</h1><p style="color:#57506b;line-height:1.6;margin:0 0 1.4rem">This page has been permanently removed.</p><a href="/" style="color:#6B5CC4;text-decoration:none;font-weight:600">← Back to rosebud.global</a></body></html>',
      { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
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
  // SSL cert; if the gate redirects that to /login the cert never issues.
  if (
    path === '/login' ||
    path === '/api/login' ||
    path.startsWith('/_next/') ||
    path.startsWith('/static/') ||
    path.startsWith('/.well-known/') ||
    path === '/favicon.ico' ||
    // Static assets from /public — the login page pulls the brand orb and
    // any fonts/icons it references. Without this, those requests get
    // 307'd to /login and the browser renders broken images on the
    // unauthenticated screen.
    /\.(png|jpe?g|svg|gif|webp|ico|woff2?|ttf|otf|css|js|map)$/i.test(path)
  ) {
    return NextResponse.next();
  }

  // Cookie + env var contract mirrors the warroom: wr_auth holds the
  // password, middleware compares it back against DASHBOARD_PASSWORD.
  // Set the same values on both projects and a single password + TOTP
  // works across warroom + engine.
  const expectedPassword = (process.env.DASHBOARD_PASSWORD ?? '').replace(/\s+$/g, '');
  if (!expectedPassword) {
    // Fail-secure: env missing locks everyone out (including the operator)
    // rather than silently letting requests through.
    return new NextResponse('Service temporarily unavailable', { status: 503 });
  }

  const cookie = request.cookies.get('wr_auth')?.value;
  if (cookie !== expectedPassword) {
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
