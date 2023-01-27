import { tokenHelpers } from '../utils';
import config from '../config';
import redis from '../redis';
import { Exception } from './index';

const generateTokens = async (userId: number, deviceId: string) => {
  const accessToken = await tokenHelpers.create(userId, config.token.expiresIn.access);
  const refreshToken = await tokenHelpers.create(userId, config.token.expiresIn.refresh);
  redis.refreshTokens.set(deviceId, refreshToken, config.token.expiresIn.refresh);
  console.log('access', accessToken);
  return {
    accessToken,
    refreshToken,
  };
};

const checkRefresh = (deviceId: string, tokens: string | string[]) => {
  // eslint-disable-next-line no-console
  console.log(tokens);
  redis.refreshTokens.get(deviceId as string);
};

const checkAuthType = (authorization: string) => {
  const tokens = authorization.split(',');
  const [accessToken, refreshToken] = tokens.map((item) => {
    const authType = item.slice(0, 6);
    if (authType !== 'Bearer') {
      return null;
    }

    const elem = item.split('.')[1];
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
