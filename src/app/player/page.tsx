import type { Metadata } from "next";

const PLAYER_VIDEO_URL =
  "https://cdn.engineering/markiplier-dog/video/h264/aac/1080p/1123.mp4";

export const metadata: Metadata = {
  title: "markiplier.dog (embed)",
  description: "Embedded video player view of markiplier.dog",
  robots: { index: false, follow: false },
};

export default function PlayerPage() {
  return (
    <video
      src={PLAYER_VIDEO_URL}
      controls
      autoPlay
      muted
      playsInline
      loop
      className="bg-ink h-full w-full object-contain"
    />
  );
}
