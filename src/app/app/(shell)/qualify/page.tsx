import StubPage from "../shell/StubPage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <StubPage
      title="Qualify"
      intro="Rules that decide who gets booked, who gets a person, and who gets nurtured."
      line="Qualify & Triage isn't running for your account yet. Once it is, this page shows every enquiry passing through your rules, the pass rate, and what was escalated."
    />
  );
}
