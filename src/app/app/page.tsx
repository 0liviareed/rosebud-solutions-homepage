import { redirect } from "next/navigation";

// The console homepage is the Dashboard.
export default function AppIndexPage() {
  redirect("/dashboard");
}
