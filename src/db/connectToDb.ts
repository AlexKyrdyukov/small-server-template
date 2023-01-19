import { Logger } from '../utils';
import dataSource from './dataSource';

const connectToDb = async () => {
  try {
    const connection = await dataSource.initialize();

    // eslint-disable-next-line no-console
    Logger.log(
      'DB connected',
    );

    process.on('SIGINT', async () => {
      if (!connection.isInitialized) {
        return;
      }
      await connection.destroy();
      // eslint-disable-next-line no-console
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
