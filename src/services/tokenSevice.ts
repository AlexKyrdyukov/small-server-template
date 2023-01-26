import { tokenHelpers } from '../utils';
import config from '../config';
import redis from '../redis';

const generateTokens = async (userId: number, deviceId: string) => {
  const accessToken = await tokenHelpers.create(userId, config.token.expiresIn.access);
  const refreshToken = await tokenHelpers.create(userId, config.token.expiresIn.refresh);
  redis.refreshTokens.set(deviceId, refreshToken, config.token.expiresIn.refresh);
  return {
    refreshToken,
    accessToken,
  };
};

const d = async () => {
  const m = await generateTokens(12, 'dddddd');
  console.log(m);
  return m;
};
setTimeout(() => {
  d();
}, 2000);

const checkRefresh = () => {
  return 'def';
};

export default {
  generateTokens,
  checkRefresh,
};
