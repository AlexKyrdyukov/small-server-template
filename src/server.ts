import config from './config';
import app from './app';
import connectToDb from './db/connectToDb';

(async () => {
  try {
    connectToDb();
    app.listen(config.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(`app listening on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('error:', error);
  }
})();
