import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://9b010688e8d789278436288e29cd6bd8@sentry.cumlord.ru/74",
  tracesSampleRate: 1,
  sendDefaultPii: true,
});
