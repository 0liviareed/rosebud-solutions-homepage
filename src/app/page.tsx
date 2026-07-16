import HomepageV2 from "@/components/redesign/HomepageV2";

/* Homepage redesign (tool launch) — self-contained nav + scroll choreography.
   Opted out of global chrome/Runtime via LayoutChrome (isBareRoute "/").
   Previous homepage (Hero/IsThisYou/HomepageFlow/…) preserved in git history. */
export default function Home() {
  return <HomepageV2 />;
}
