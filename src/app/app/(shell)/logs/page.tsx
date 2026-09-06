import StubPage from "../shell/StubPage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <StubPage
      title="Logs"
      intro="Every event the engine records for your account."
      line="No events have been recorded for your account yet. As each capability goes live its steps appear here, newest first."
    />
  );
}
