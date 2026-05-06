// Tiny UA parser — purpose-built for analytics bucketing only. Avoids the
// 30kb ua-parser-js dep and the cold-start cost on the edge function.
// Returns the same fields GA4 uses so downstream UIs can mirror its labels.

export type UAInfo = {
  device_category: 'desktop' | 'mobile' | 'tablet' | 'unknown'
  browser: string | null
  browser_version: string | null
  os: string | null
  os_version: string | null
  is_bot: boolean
}

const BOT_PATTERNS = [
  /bot\b/i, /crawler/i, /spider/i, /slurp/i, /\bcrawl\b/i,
  /preview/i, /headlesschrome/i, /chrome-lighthouse/i, /pingdom/i,
  /uptimerobot/i, /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
  /whatsapp/i, /telegrambot/i, /slackbot/i, /discordbot/i,
  /googlepagespeed/i, /lighthouse/i, /vercel-screenshot/i, /vercel-favicon/i,
  /baiduspider/i, /yandexbot/i, /bingbot/i, /duckduckbot/i,
  /ahrefsbot/i, /semrushbot/i, /mj12bot/i, /dotbot/i, /petalbot/i,
  /node-fetch/i, /python-requests/i, /curl\//i, /wget\//i, /go-http-client/i,
]

export function parseUA(ua: string | null | undefined): UAInfo {
  if (!ua) return { device_category: 'unknown', browser: null, browser_version: null, os: null, os_version: null, is_bot: false }

  const is_bot = BOT_PATTERNS.some(rx => rx.test(ua))

  // Device category — order matters: tablet must be tested before mobile.
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(ua)
  const isMobile = /(mobile|iphone|ipod|android.*mobile|windows phone|blackberry)/i.test(ua)
  const device_category: UAInfo['device_category'] = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop'

  // Browser — pick the most specific match first. Order intentional.
  // (Edge identifies as "Edg/", Chrome identifies as "Chrome/", Safari last.)
  let browser: string | null = null
  let browser_version: string | null = null
  const brSpec: [RegExp, string][] = [
    [/edg\/(\d+(?:\.\d+)?)/i, 'Edge'],
    [/opr\/(\d+(?:\.\d+)?)/i, 'Opera'],
    [/firefox\/(\d+(?:\.\d+)?)/i, 'Firefox'],
    [/chrome\/(\d+(?:\.\d+)?)/i, 'Chrome'],
    [/version\/(\d+(?:\.\d+)?).*safari\//i, 'Safari'],
    [/safari\/(\d+(?:\.\d+)?)/i, 'Safari'],
    [/msie (\d+(?:\.\d+)?)/i, 'IE'],
    [/trident.*rv:(\d+(?:\.\d+)?)/i, 'IE'],
  ]
  for (const [rx, name] of brSpec) {
    const m = ua.match(rx)
    if (m) { browser = name; browser_version = m[1]; break }
  }

  // OS
  let os: string | null = null
  let os_version: string | null = null
  if (/windows nt 10/i.test(ua)) { os = 'Windows'; os_version = '10' }
  else if (/windows nt 11/i.test(ua)) { os = 'Windows'; os_version = '11' }
  else if (/windows nt (\d+\.\d+)/i.test(ua)) { os = 'Windows'; os_version = ua.match(/windows nt (\d+\.\d+)/i)?.[1] ?? null }
  else if (/mac os x (\d+[_.\d]+)/i.test(ua)) {
    os = 'macOS'
    os_version = (ua.match(/mac os x (\d+[_.\d]+)/i)?.[1] ?? '').replace(/_/g, '.')
  }
  else if (/iphone os (\d+[_.\d]+)/i.test(ua) || /cpu iphone os (\d+[_.\d]+)/i.test(ua)) {
    os = 'iOS'
    os_version = (ua.match(/iphone os (\d+[_.\d]+)/i)?.[1] ?? '').replace(/_/g, '.')
  }
  else if (/ipad.*cpu os (\d+[_.\d]+)/i.test(ua)) {
    os = 'iPadOS'
    os_version = (ua.match(/cpu os (\d+[_.\d]+)/i)?.[1] ?? '').replace(/_/g, '.')
  }
  else if (/android (\d+(?:\.\d+)*)/i.test(ua)) { os = 'Android'; os_version = ua.match(/android (\d+(?:\.\d+)*)/i)?.[1] ?? null }
  else if (/cros/i.test(ua))    os = 'ChromeOS'
  else if (/linux/i.test(ua))   os = 'Linux'

  return { device_category, browser, browser_version, os, os_version, is_bot }
}
