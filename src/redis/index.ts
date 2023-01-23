import { createClient } from 'redis';

class Redis {
  client = createClient();
  // this.client.connect();

  async setValue(key: string, value: string) {
    this.client.connect();
    await this.client.set(key, value);
  }

  async getValue(key: string) {
    this.client.connect();
    await this.client.get(key);
  }

  async disconnectRedis() {
    await this.client.disconnect();
  }
}

const redisHelper = {
  user: new Redis(),
};

export default redisHelper;
