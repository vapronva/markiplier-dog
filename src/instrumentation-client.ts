import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://9b010688e8d789278436288e29cd6bd8@sentry.cumlord.ru/74",
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
