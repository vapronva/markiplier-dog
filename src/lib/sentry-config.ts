import type { BrowserOptions, EdgeOptions, NodeOptions } from "@sentry/nextjs";

export const SENTRY_DSN =
  process.env.NEXT_PUBLIC_SENTRY_DSN ??
  "https://9b010688e8d789278436288e29cd6bd8@sentry.cumlord.ru/74";

const baseConfig = {
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
};

export const sentryBaseConfig = { ...baseConfig } satisfies NodeOptions;
export const sentryEdgeConfig = { ...baseConfig } satisfies EdgeOptions;
export const sentryClientConfig = {
  ...baseConfig,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
} satisfies BrowserOptions;
