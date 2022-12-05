import config from './config';
// import dataSource from './db/dataSource';
import app from './app';
import connectToDb from './db/connectToDb';

(async () => {
  try {
    // await dataSource.initialize();
    connectToDb();
    // eslint-disable-next-line no-console
    console.log('start');
    app.listen(config.serverProperty.serverPort, () => {
      // eslint-disable-next-line no-console
      console.log(`app listening on port ${config.serverProperty.serverPort}`);
    });
  } catch (error) {
    console.error('error:', error);
  }
})();
