const PLAYER_VIDEO_URL =
  "https://cdn.engineering/markiplier-dog/video/h264/aac/1080p/1123.mp4";

export default function PlayerPage() {
  return (
    <video
      src={PLAYER_VIDEO_URL}
      controls
      autoPlay
      muted
      playsInline
      loop
      className="h-full w-full bg-black object-contain"
    />
  );
}
