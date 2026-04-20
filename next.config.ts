import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const config: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.engineering",
        pathname: "/markiplier-dog/**",
      },
    ],
  },
};

export default withSentryConfig(config, {
  org: "cmld",
  project: "markiplier-dog",
  sentryUrl: "https://sentry.cumlord.ru/",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/bark",
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
});
