import * as fs from 'fs';
import dotenv from 'dotenv';

const configDefault = dotenv.parse(fs.readFileSync('default.env'));
const configLocal = dotenv.parse(fs.readFileSync('.env'));

const mainConfig = {
  ...configDefault,
  ...configLocal,
};

const config = {
  modeEnv: mainConfig.NODE_ENV,
  serverProperty: {
    serverPort: mainConfig.SERVER_PORT,
    serverEndPoints: mainConfig.SERVER_ENDPOINTS_PREFIX,
    serverError: mainConfig.SERVER_INTERNAL_ERROR_MESSAGE,
    serverFolderName: mainConfig.SERVER_PUBLIC_FOLDER_NAME,
  },
  hashProperty: {
    hashSalt: mainConfig.PASSWORD_HASH_SALT,
    hashType: mainConfig.PASSWORD_HASH_TYPE,
  },
  tokenProperty: {
    tokenSecret: mainConfig.TOKEN_SECRET,
    tokenExpiration: mainConfig.TOKEN_AUTH_EXPIRATION,
  },
  urlsProperty: {
    clientUrl: mainConfig.CLIENT_APP_URL,
    currentUrl: mainConfig.CURRENT_URL,
  },
  postgresDbProperty: {
    port: mainConfig.POSTGRES_DB_PORT,
    host: mainConfig.POSTGRES_DB_HOST,
    user: mainConfig.POSTGRES_DB_USER,
    password: mainConfig.POSTGRES_DB_PASSWORD,
    database: mainConfig.POSTGRES_DB_NAME,
    logging: mainConfig.POSTGRES_LOGGING,
  },
};

export default config;
