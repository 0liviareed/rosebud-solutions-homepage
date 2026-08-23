import posthog from "posthog-js";

// Every booking link sitewide uses rel="noopener noreferrer", so cal.eu never
// receives a Referer header and can't tell us which page a booking came from.
// This fires a client-side event carrying that page instead, independent of
// the browser's referrer mechanism. Fire-and-forget: never blocks or delays
// the link's own navigation. No-ops silently if PostHog isn't initialised
// (no consent yet, or NEXT_PUBLIC_POSTHOG_KEY unset).
export function trackBookingClick(destinationUrl: string) {
  try {
    posthog.capture("booking_link_clicked", {
      destination_url: destinationUrl,
      source_page: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  } catch {
    /* posthog not ready — never block the click on this */
  }
}
