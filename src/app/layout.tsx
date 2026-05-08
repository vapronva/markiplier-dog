import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

const OG_VIDEO_URL =
  "https://cdn.engineering/markiplier-dog/video/h264/aac/1080p/1123.mp4";
const OG_IMAGE_URL =
  "https://cdn.engineering/markiplier-dog/image/dog/jpeg/og/screenshot/dog.jpg";
const OG_PLAYER_URL = "https://markiplier.dog/player";

export const metadata: Metadata = {
  metadataBase: new URL("https://markiplier.dog"),
  title: "markiplier.dog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "video.other",
    url: "https://markiplier.dog",
    siteName: "markiplier.dog",
    title: "markiplier.dog",
    images: [
      {
        url: OG_IMAGE_URL,
      },
    ],
    videos: [
      {
        url: OG_VIDEO_URL,
        secureUrl: OG_VIDEO_URL,
        width: 1080,
        height: 1290,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "player",
    title: "markiplier.dog",
    images: [
      {
        url: OG_IMAGE_URL,
      },
    ],
    players: [
      {
        playerUrl: OG_PLAYER_URL,
        streamUrl: OG_VIDEO_URL,
        width: 1080,
        height: 1290,
      },
    ],
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="h-screen w-screen overflow-hidden bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
