import * as Sentry from "@sentry/nextjs";

import { sentryEdgeConfig } from "~/lib/sentry-config";

Sentry.init(sentryEdgeConfig);
