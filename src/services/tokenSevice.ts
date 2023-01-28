import { errorTypes, tokenHelpers } from '../utils';
import config from '../config';
import redis from '../redis';
import { Exception } from './index';

const generateTokens = async (userId: number, deviceId: string) => {
  const accessToken = await tokenHelpers.create(userId, config.token.expiresIn.access);
  const refreshToken = await tokenHelpers.create(userId, config.token.expiresIn.refresh);
  await redis.refreshTokens.set(deviceId, refreshToken, config.token.expiresIn.refresh);

  return {
    accessToken,
    refreshToken,
  };
};

const checkRefresh = async (deviceId: string, token: string | string[]) => {
  const existenToken = await redis.refreshTokens.get(deviceId as string);

  if ((token !== existenToken) || !existenToken) {
    throw Exception.createError(errorTypes.FORBIDDEN_USER_LOG_IN);
  }

  const { id } = await tokenHelpers.decode(token, errorTypes.FORBIDDEN_USER_LOG_IN);
  const accessToken = await tokenHelpers.create(id, config.token.expiresIn.access);
  const refreshToken = await tokenHelpers.create(id, config.token.expiresIn.refresh);

  await redis.refreshTokens.set(deviceId, refreshToken, config.token.expiresIn.refresh);

  return {
    accessToken,
    refreshToken,
  };
};

const checkAuthType = (authorization: string) => {
  const tokens = authorization.split(',');

  const [accessToken, refreshToken] = tokens.map((item) => {
    const authType = item.slice(0, 6);
    if (authType !== 'Bearer') {
      throw Exception.createError(errorTypes.FORBIDDEN_UNKNOWN_AUTHORIZATION_TYPE);
    }
    const elem = item.split(' ')[1];
    return elem;
  });

  return {
    accessToken,
    refreshToken,
  };
};

export default {
  generateTokens,
  checkRefresh,
  checkAuthType,
};
