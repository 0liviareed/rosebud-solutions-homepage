import StubPage from "../shell/StubPage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <StubPage
      title="Book"
      intro="Qualified enquiries booked straight into your diary."
      line="Book into Diary isn't running for your account yet. Once it is, this page shows slots offered, bookings made and reschedules absorbed."
    />
  );
}
