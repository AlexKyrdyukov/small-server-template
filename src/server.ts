import app from './app';
import config from './config';
import { connectToDb } from './db';
import { logger } from './utils';
import { connecRedis } from './redis';

(async () => {
  try {
    await connectToDb();
    await connecRedis();
    app.listen(config.server.port, () => {
      logger.log(`app listening on port ${config.server.port}`);
    });
  } catch (error) {
    logger.error(error);
  }
})();
