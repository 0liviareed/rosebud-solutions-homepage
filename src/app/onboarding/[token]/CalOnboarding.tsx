"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Cal.eu inline embed for the onboarding event. The event itself owns the
// AVAILABILITY WINDOW (set in the Cal dashboard) — this only renders it, prefills
// the customer, and passes hidden IDs so the Cal booking webhook can verify the
// booker's subscription. Link + origin are env-configurable.
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_ONBOARDING_LINK ?? "rosebudsolutions/onboarding";
const CAL_ORIGIN = process.env.NEXT_PUBLIC_CAL_ORIGIN ?? "https://cal.eu";
const NS = "onboarding";

type Props = { email: string; name: string; customerId: string; subscriptionId: string };

export default function CalOnboarding({ email, name, customerId, subscriptionId }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NS, embedJsUrl: `${CAL_ORIGIN}/embed/embed.js` });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Cal
      namespace={NS}
      calLink={CAL_LINK}
      calOrigin={CAL_ORIGIN}
      style={{ width: "100%", height: "100%", minHeight: 660, overflow: "scroll" }}
      config={{
        name,
        email,
        layout: "month_view",
        // Hidden metadata → present in the Cal booking webhook payload.
        "metadata[customer_id]": customerId,
        "metadata[subscription_id]": subscriptionId,
      }}
    />
  );
}
