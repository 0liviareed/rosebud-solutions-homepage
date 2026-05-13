/**
 * Cookie consent state — UK PECR + GDPR aligned.
 *
 * Stored in localStorage so the choice survives reloads. Versioned: if we
 * change cookie categories or descriptions, bump CONSENT_VERSION and every
 * user re-prompts on next visit. ICO recommends re-prompting yearly even
 * without a policy change — we expire after 365 days.
 *
 * Categories deliberately mirror the established cookie-banner standard
 * (Necessary / Functional / Statistics / Marketing) so a regulator or
 * auditor sees a familiar structure.
 */

export type ConsentCategories = {
  necessary: true // always true, locked
  functional: boolean
  statistics: boolean
  marketing: boolean
}

export type ConsentRecord = {
  version: number
  timestamp: string // ISO
  categories: ConsentCategories
}

export const CONSENT_VERSION = 1
const STORAGE_KEY = 'rb_cookie_consent_v1'
const MAX_AGE_DAYS = 365

export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  functional: false,
  statistics: false,
  marketing: false,
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (parsed.version !== CONSENT_VERSION) return null
    const ageMs = Date.now() - new Date(parsed.timestamp).getTime()
    if (ageMs > MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return null
    // Force necessary=true even if stored value is wrong; never trust client to
    // turn off strictly-necessary handling.
    parsed.categories.necessary = true
    return parsed
  } catch {
    return null
  }
}

export function writeConsent(categories: Omit<ConsentCategories, 'necessary'>) {
  if (typeof window === 'undefined') return
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: { necessary: true, ...categories },
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  window.dispatchEvent(new CustomEvent('rb:consent-updated', { detail: record }))
}

export function clearConsent() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new CustomEvent('rb:consent-updated', { detail: null }))
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('rb:cookie-settings-open'))
}
