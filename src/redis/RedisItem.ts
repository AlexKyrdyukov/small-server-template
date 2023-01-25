import ms from 'ms';

import { redisClient } from './connect';

class RedisItem<T_DataType> {
  rootKey: string;

  defaultExpiresIn?: string;

  constructor(rootKey: string, defaultExpiresIn?: string) {
    this.rootKey = rootKey;
    this.defaultExpiresIn = defaultExpiresIn;
  }

  createKey = (nestedKey: string) => {
    return `${this.rootKey}:${nestedKey}`;
  };

  get = async (nestedKey: string): Promise<T_DataType> => {
    const key = this.createKey(nestedKey);

    const data = await redisClient.get(key);

    const parsedData = JSON.parse(data);

    return parsedData;
  };

  set = async (nestedKey: string, value: T_DataType, expiresIn?: string) => {
    const key = this.createKey(nestedKey);

    const strinfigyedValue = JSON.stringify(value);

    const expiresInInString = expiresIn || this.defaultExpiresIn;
    const expiresInInNumber = expiresInInString ? ms(expiresInInString) : undefined;

    await redisClient.set(key, strinfigyedValue, { EX: expiresInInNumber });
  };

  remove = async (nestedKey: string) => {
    const key = this.createKey(nestedKey);

    await redisClient.del(key);
  };
}

export default RedisItem;
