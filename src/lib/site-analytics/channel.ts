// GA4 Default Channel Group classifier.
// Mirrors the rules at https://support.google.com/analytics/answer/9756891
// just enough to bucket marketing-site traffic for the /site page.
// Order matters — paid wins over organic when utm_medium is unambiguous.

const SEARCH_ENGINES = [
  'google.', 'bing.', 'duckduckgo.', 'yahoo.', 'yandex.', 'baidu.',
  'ecosia.', 'qwant.', 'startpage.', 'kagi.',
]

const SOCIAL_DOMAINS = [
  'facebook.', 'instagram.', 'linkedin.', 't.co', 'twitter.', 'x.com',
  'tiktok.', 'youtube.', 'reddit.', 'pinterest.', 'snapchat.', 'threads.',
  'mastodon.', 'bsky.app',
]

const PAID_MEDIUMS = new Set(['cpc', 'ppc', 'paidsearch', 'paid-search', 'cpm', 'paid'])
const PAID_SOCIAL_MEDIUMS = new Set(['paidsocial', 'paid-social', 'social-paid', 'paid_social'])
const EMAIL_MEDIUMS = new Set(['email', 'e-mail', 'newsletter'])
const DISPLAY_MEDIUMS = new Set(['display', 'banner', 'expandable', 'interstitial'])
const VIDEO_MEDIUMS = new Set(['video'])
const SMS_MEDIUMS = new Set(['sms', 'mms'])
const AFFILIATE_MEDIUMS = new Set(['affiliate', 'affiliates'])
const ORGANIC_SOCIAL_MEDIUMS = new Set(['social', 'social-network', 'social-media', 'sm', 'social-networking', 'organic_social'])

function host(url: string | null | undefined): string {
  if (!url) return ''
  try {
    return new URL(url).hostname.toLowerCase()
  } catch {
    return ''
  }
}

function matches(h: string, list: string[]): boolean {
  return list.some(d => h.includes(d))
}

export function classifyChannel(input: {
  referrer?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}): string {
  const med = (input.utm_medium ?? '').toLowerCase()
  const src = (input.utm_source ?? '').toLowerCase()
  const ref = host(input.referrer)
  const isSearch = matches(ref, SEARCH_ENGINES)
  const isSocial = matches(ref, SOCIAL_DOMAINS)

  if (PAID_SOCIAL_MEDIUMS.has(med) || (isSocial && PAID_MEDIUMS.has(med))) return 'Paid Social'
  if (PAID_MEDIUMS.has(med))         return 'Paid Search'
  if (DISPLAY_MEDIUMS.has(med))      return 'Display'
  if (VIDEO_MEDIUMS.has(med))        return 'Video'
  if (EMAIL_MEDIUMS.has(med))        return 'Email'
  if (SMS_MEDIUMS.has(med))          return 'SMS'
  if (AFFILIATE_MEDIUMS.has(med))    return 'Affiliates'
  if (ORGANIC_SOCIAL_MEDIUMS.has(med) || (isSocial && (med === 'referral' || !med))) return 'Organic Social'

  // No UTM medium — fall through to referrer-based classification.
  if (!med) {
    if (!ref)        return 'Direct'
    if (isSearch)    return 'Organic Search'
    if (isSocial)    return 'Organic Social'
    return 'Referral'
  }

  // Has utm but doesn't match any known bucket — bin as Other.
  if (med === 'referral') return 'Referral'
  return src ? 'Other' : 'Direct'
}
