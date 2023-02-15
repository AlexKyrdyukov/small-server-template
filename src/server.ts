import app from './app';
import config from './config';
import { logger } from './utils';
import { connectToDb } from './db';
import { connectRedis } from './redis';

(async () => {
  try {
    await connectToDb();
    await connectRedis();
    app.listen(config.server.port, () => {
      logger.log(`app listening on port ${config.server.port}`);
    });
  } catch (error) {
    logger.error(error);
  }
})();
