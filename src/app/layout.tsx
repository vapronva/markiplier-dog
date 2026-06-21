import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { ASSETS } from "~/lib/assets";

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
        url: ASSETS.dogPoster,
      },
    ],
    videos: [
      {
        url: ASSETS.videoHq,
        secureUrl: ASSETS.videoHq,
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
        url: ASSETS.dogPoster,
      },
    ],
    players: [
      {
        playerUrl: OG_PLAYER_URL,
        streamUrl: ASSETS.videoHq,
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
      <body className="bg-ink h-screen w-screen overflow-hidden text-white antialiased">
        {children}
      </body>
    </html>
  );
}
