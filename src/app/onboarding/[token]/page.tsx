import { appSupabaseAdmin } from "@/lib/appSupabase";
import CalOnboarding from "./CalOnboarding";

export const dynamic = "force-dynamic";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";
const AD = "#6E5FB8";
const INK = "#17131F";

// Gated onboarding booking. The signed token (delivered only in the confirmation
// email) resolves to an org; we verify the subscription is ACTIVE in our DB before
// rendering the Cal booking. The Cal webhook re-checks on booking (belt-and-braces).
// customer_id + subscription_id ride along as hidden metadata so the webhook can
// confirm the booker against Stripe.
export default async function OnboardingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const sb = appSupabaseAdmin();

  const { data: onb } = await sb.from("onboarding").select("org_id").eq("booking_token", token).maybeSingle();
  const orgId = onb?.org_id ?? null;

  let subStatus: string | null = null;
  let subId: string | null = null;
  let customerId: string | null = null;
  let planName = "your";
  let email = "";
  let name = "";

  if (orgId) {
    const { data: sub } = await sb.from("subscriptions")
      .select("id, status, plan_key, stripe_customer_id, created_at")
      .eq("org_id", orgId).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (sub) {
      subStatus = sub.status as string;
      subId = sub.id as string;
      customerId = (sub.stripe_customer_id as string) ?? null;
      if (sub.plan_key) planName = (sub.plan_key as string).charAt(0).toUpperCase() + (sub.plan_key as string).slice(1);
    }
    // Owner details for prefilling the Cal form.
    const { data: mem } = await sb.from("org_members").select("user_id").eq("org_id", orgId).eq("role", "owner").maybeSingle();
    if (mem?.user_id) {
      const { data: prof } = await sb.from("profiles").select("email, first_name, last_name").eq("id", mem.user_id).maybeSingle();
      if (prof) {
        email = (prof.email as string) ?? "";
        name = [prof.first_name, prof.last_name].filter(Boolean).join(" ");
      }
    }
  }

  const active = subStatus === "active";

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: INK, background: "#EDEBF3", minHeight: "100vh" }}>
      <main style={{ maxWidth: active ? 980 : 560, margin: "0 auto", padding: "72px 24px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: active ? 36 : 0 }}>
          <div style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 14 }}>Onboarding</div>
          {active ? (
            <>
              <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,4vw,46px)", lineHeight: 1.06, margin: 0 }}>
                Book your <em style={{ fontStyle: "italic", color: AD }}>onboarding</em> session
              </h1>
              <p style={{ margin: "18px auto 0", maxWidth: 560, fontSize: 15.5, lineHeight: 1.6, color: "rgba(23,19,31,0.62)" }}>
                You&apos;re on the <b style={{ color: INK }}>{planName}</b> plan. Pick a time below — we&apos;ll agree your good-lead
                definition, connect your CRM &amp; calendar, and set your escalation rules. Full refund if you cancel before the session.
              </p>
            </>
          ) : (
            <Blocked reason={!orgId ? "invalid" : subStatus} />
          )}
        </div>

        {active && subId && (
          <div style={{ background: "#fff", border: "1px solid rgba(23,19,31,0.08)", borderRadius: 18, boxShadow: "0 24px 60px -40px rgba(23,19,31,0.35)", overflow: "hidden", marginTop: 8 }}>
            <CalOnboarding email={email} name={name} customerId={customerId ?? ""} subscriptionId={subId} />
          </div>
        )}
      </main>
    </div>
  );
}

function Blocked({ reason }: { reason: string | null }) {
  const invalid = reason === "invalid";
  const title = invalid ? "This booking link isn't valid" : "Your subscription isn't active yet";
  const body = invalid
    ? "This link may have expired or been mistyped. Use the button in your confirmation email, or get in touch and we'll sort it."
    : "We couldn't confirm an active subscription for this account, so onboarding can't be booked yet. If you've just paid, give it a minute and refresh — otherwise reply to your confirmation email or contact us and we'll help.";
  return (
    <div style={{ marginTop: 20 }}>
      <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.08, margin: 0 }}>{title}</h1>
      <p style={{ margin: "18px auto 0", maxWidth: 480, fontSize: 15, lineHeight: 1.6, color: "rgba(23,19,31,0.62)" }}>{body}</p>
      <a href="mailto:contact@rosebud.global" style={{ display: "inline-block", marginTop: 26, background: A, color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 14.5, padding: "13px 24px", borderRadius: 12 }}>
        Contact us
      </a>
    </div>
  );
}
