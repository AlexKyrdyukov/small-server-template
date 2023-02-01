import redis from '../../redis';
import Exception from '../Exception';
import { errorTypes } from '../../utils';

const verifyRefresh = async (deviceId: string, token: string | string[]) => {
  const existenToken = await redis.refreshTokens.get(deviceId as string);

  if ((token !== existenToken) || !existenToken) {
    throw Exception.createError(errorTypes.FORBIDDEN_USER_LOG_IN);
  }
};

export default verifyRefresh;
