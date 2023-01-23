import dataSource from './dataSource';

import { Logger } from '../utils';

const connectToDb = async () => {
  try {
    const connection = await dataSource.initialize();

    Logger.log(
      'DB connected',
    );

    process.on('SIGINT', async () => {
      if (!connection.isInitialized) {
        return;
      }
      await connection.destroy();
      Logger.info('DB connection is disconnected due to application termination');
      process.exit(0);
    });

    return connection;
  } catch (err) {
    Logger.error(`DB connection error, ${err.message}`);
    process.exit(1);
  }
};

export default connectToDb;
