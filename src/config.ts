import * as fs from 'fs';
import dotenv from 'dotenv';

const configDefault = dotenv.parse(fs.readFileSync('default.env'));
const configLocal = dotenv.parse(fs.readFileSync('.env'));

const mainConfig = {
  ...configDefault,
  ...configLocal,
};

const config = {
  nodeEnv: mainConfig.NODE_ENV === 'true',
  server: {
    port: mainConfig.SERVER_PORT,
    endoints: mainConfig.SERVER_ENDPOINTS_PREFIX,
    error: mainConfig.SERVER_INTERNAL_ERROR_MESSAGE,
    folderName: mainConfig.SERVER_PUBLIC_FOLDER_NAME,
  },
  hash: {
    salt: mainConfig.PASSWORD_HASH_SALT,
    type: mainConfig.PASSWORD_HASH_TYPE,
  },
  token: {
    secret: mainConfig.TOKEN_SECRET,
    expiration: mainConfig.TOKEN_AUTH_EXPIRATION,
  },
  urls: {
    client: mainConfig.CLIENT_APP_URL,
    current: mainConfig.CURRENT_URL,
  },
  postgres: {
    portDb: mainConfig.POSTGRES_DB_PORT,
    hostDb: mainConfig.POSTGRES_DB_HOST,
    user: mainConfig.POSTGRES_DB_USER,
    password: mainConfig.POSTGRES_DB_PASSWORD,
    database: mainConfig.POSTGRES_DB_NAME,
    logging: mainConfig.POSTGRES_DB_LOGGING === 'true',
  },
};

export default config;
