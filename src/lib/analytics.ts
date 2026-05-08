/**
 * Tiny wrapper around posthog-js so capture calls don't break SSR or fail
 * silently if the snippet hasn't loaded yet (e.g. during the brief moment
 * before PostHogProvider's effect runs).
 *
 * Usage from any client component:
 *   import { track } from '@/lib/analytics'
 *   track('cta_click', { cta: 'book_call', location: 'hero' })
 */

import posthog from 'posthog-js'

type Props = Record<string, string | number | boolean | null | undefined>

export function track(event: string, properties?: Props) {
  if (typeof window === 'undefined') return
  // posthog-js queues calls before init returns, so this is safe even if the
  // snippet is still loading — events will flush once the SDK is ready.
  try {
    posthog.capture(event, properties)
  } catch {
    // Don't let a missing snippet break the user's interaction. Swallow.
  }
}
