import { readFileSync } from 'fs';
import { join } from 'path';

// `force-static` bakes the response at build time so there's no per-request
// disk read on Vercel. The dashboard is deliberately a static asset; any
// per-prospect customisation (company name, logo, outcome anchor) lives in
// the browser's localStorage on first visit.
export const dynamic = 'force-static';

export async function GET() {
  const html = readFileSync(
    join(process.cwd(), 'src/app/demo/dashboard.html'),
    'utf-8',
  );
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      // Authed users only — keep CDNs and shared caches from holding it.
      'Cache-Control': 'private, max-age=0, must-revalidate',
    },
  });
}
