import type { Metadata } from "next";

import { ASSETS } from "~/lib/assets";

export const metadata: Metadata = {
  title: "markiplier.dog (embed)",
  description: "Embedded video player view of markiplier.dog",
  robots: { index: false, follow: false },
};

export default function PlayerPage() {
  return (
    <video
      src={ASSETS.videoHq}
      aria-label="markiplier.dog video player"
      controls
      autoPlay
      muted
      playsInline
      loop
      className="bg-ink h-full w-full object-contain"
    />
  );
}
