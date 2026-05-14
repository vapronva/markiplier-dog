import type { Metadata } from "next";

import { HomeExperience } from "~/components/HomeExperience";

export const metadata: Metadata = {
  title: "markiplier.dog",
};

export default function HomePage() {
  return <HomeExperience />;
}
