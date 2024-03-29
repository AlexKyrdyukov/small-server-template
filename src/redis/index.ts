import RedisItem from './RedisItem';
import config from '../config';

export { default as connectRedis } from './connect';

export default {
  refreshTokens: new RedisItem<string>('refreshTokens', config.token.expiresIn.refresh),
};
