import { createClient } from 'redis';
import app from './app';
import config from './config';
import { connectToDb } from './db';
import { Logger } from './utils';

// redis://user:password@localhost:4000

(async () => {
  try {
    const client = createClient({
      url: 'redis://alice:foobared@localhost.redis.server:4000',
    });
    client.on('connect', () => {
      Logger.info('connected');
    });
    client.on('error', () => {
      Logger.error('error');
    });
    await connectToDb();
    app.listen(config.server.port, () => {
      Logger.log(`app listening on port ${config.server.port}`);
    });
  } catch (error) {
    Logger.error(error);
  }
})();
