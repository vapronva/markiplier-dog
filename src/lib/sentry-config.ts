import type { BrowserOptions, NodeOptions } from "@sentry/nextjs";

export const SENTRY_DSN =
  process.env.NEXT_PUBLIC_SENTRY_DSN ??
  "https://9b010688e8d789278436288e29cd6bd8@sentry.cumlord.ru/74";

export const sentryBaseConfig = {
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
} satisfies NodeOptions;

export const sentryClientConfig = {
  ...sentryBaseConfig,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
} satisfies BrowserOptions;
