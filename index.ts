import { logger } from './server/utils/logger';
import expressApp from './server/server';
import chalk from 'chalk';
import * as Sentry from '@sentry/node';

Sentry.init({
  // Use your own DSN
  dsn: `https://${process.env.SENTRY_DSN}.ingest.sentry.io/5783360`,
  tracesSampleRate: 1.0,
});

expressApp.listen(process.env.PORT, () => {
  logger.info(
    chalk`{yellow.bold Server running in} ${process.env.NODE_ENV} {yellow.bold mode on port} ${process.env.PORT}`
  );
});
