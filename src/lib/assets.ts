const CDN = "https://cdn.engineering/markiplier-dog";

export const ASSETS = {
  videoHq: `${CDN}/video/h264/aac/1080p/1123.mp4`,
  videoLq: `${CDN}/video/h264/aac/80p/1123.mp4`,
  dogPoster: `${CDN}/image/dog/jpeg/og/screenshot/dog.jpg`,
  dogIcon: `${CDN}/image/dog/png/barkiplier.png`,
} as const;
