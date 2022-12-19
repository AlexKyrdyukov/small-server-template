/* eslint-disable no-console */
import app from './app';
import config from './config';
import connectToDb from './db/connectToDb';

(async () => {
  try {
    await connectToDb();
    app.listen(config.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(`app listening on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('error:', error);
  }
})();
