import config from '../../config';

import redis from '../../redis';
import asyncSign from './asyncSign';

const createTokens = async (userId: string, deviceId: string) => {
  const accessToken = await asyncSign(
    { userId },
    config.token.secret,
    { expiresIn: config.token.expiresIn.access },
  );
  const refreshToken = await asyncSign(
    { userId },
    config.token.secret,
    { expiresIn: config.token.expiresIn.refresh },
  );
  await redis.refreshTokens.set(deviceId, refreshToken, config.token.expiresIn.refresh);

  return {
    accessToken,
    refreshToken,
  };
};

export default createTokens;
