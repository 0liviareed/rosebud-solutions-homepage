'use client'

import { openCookieSettings } from '@/lib/consent'

export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="rb-footer-link rb-cookie-footer-trigger"
    >
      Cookie settings
    </button>
  )
}
