import app from './app';
import config from './config';
import { connectToDb } from './db';
import { Logger } from './utils';
import redisHelper from './redis';

(async () => {
  try {
    await connectToDb();
    app.listen(config.server.port, () => {
      Logger.log(`app listening on port ${config.server.port}`);
    });
  } catch (error) {
    Logger.error(error);
  }
})();

redisHelper.user.setValue('key', 'value');
const redis = redisHelper.user.getValue('key');
console.log(redis);
