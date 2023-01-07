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
    endointsPrefix: mainConfig.SERVER_ENDPOINTS_PREFIX,
    internalErrorMessage: mainConfig.SERVER_INTERNAL_ERROR_MESSAGE,
    publicFolderName: mainConfig.SERVER_PUBLIC_FOLDER_NAME,
  },
  hash: {
    paswordSalt: mainConfig.PASSWORD_HASH_SALT,
    passwordType: mainConfig.PASSWORD_HASH_TYPE,
  },
  token: {
    secret: mainConfig.TOKEN_SECRET,
    accesExpiration: mainConfig.ACCESS_TOKEN_AUTH_EXPIRATION,
    refreshExpiration: mainConfig.REFRESH_TOKEN_AUTH_EXPIRATION,
    algorithm: mainConfig.TOKEN_HASH_TYPE,
  },
  urls: {
    clientApp: mainConfig.CLIENT_APP_URL,
    current: mainConfig.CURRENT_URL,
  },
  postgres: {
    dbPort: mainConfig.POSTGRES_DB_PORT,
    dbHost: mainConfig.POSTGRES_DB_HOST,
    dbUser: mainConfig.POSTGRES_DB_USER,
    dbPassword: mainConfig.POSTGRES_DB_PASSWORD,
    dbName: mainConfig.POSTGRES_DB_NAME,
    dbLogging: mainConfig.POSTGRES_DB_LOGGING === 'true',
  },
};

export default config;
