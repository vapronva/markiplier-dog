"use client";

import * as Sentry from "@sentry/nextjs";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <html lang="en" className={inter.variable}>
      <body className="h-screen w-screen overflow-hidden bg-black text-white antialiased">
        <main className="flex h-full w-full flex-col items-center justify-center gap-6 p-8 font-mono">
          <h1 className="text-4xl font-black tracking-tighter uppercase md:text-6xl">
            something broke
          </h1>
          <p className="max-w-md text-center text-sm text-white/40">
            market plier escaped. try again, or reload the page.
          </p>
          <button
            onClick={() => reset()}
            className="font-bold text-white/60 uppercase transition-colors hover:text-red-500"
          >
            [ TRY AGAIN ]
          </button>
        </main>
      </body>
    </html>
  );
}
