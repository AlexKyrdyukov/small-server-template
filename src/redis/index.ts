import { createClient } from 'redis';
import db from '../db';

import { Logger } from '../utils';

// type RedisClientType = ReturnType<typeof createClient>;

// class Redis {
//   private readonly cache: RedisClientType;

//   private saveTime: number;

//   constructor(saveTime: number) {
//     this.saveTime = saveTime;
//     this.cache = createClient();
//     this.cache.on('error', (error: string) => Logger.log(`redis client error, ${error}`));
//     this.cache.on('connect', (connect: string) => Logger.log(`redis client connect ${connect}`));
//   }

//   async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
//     if (!this.cache.connect) {
//       // eslint-disable-next-line no-return-await
//       return await fetcher();
//     }

//     return new Promise((resolve, reject) => {
//       this.cache.get(key, async (error: string, value: T | PromiseLike<T>) => {
//         if (error) {
//           return reject(error);
//         }
//         if (value) {
//           return resolve(value);
//         }

//         const result = await fetcher();
//         this.cache.set(key, result, this.saveTime, (error: string, _reply: T | PromiseLike<T>) => {
//           if (error) {
//             return reject(error);
//           }
//         });
//         return resolve(result);
//       });
//     });
//   }

//   delete(key: string) {
//     this.cache.del(key);
//   }

//   flushAllElements() {
//     this.cache.flushall();
//   }
// }

// const redisHelper = {
//   user: new Redis(60),
//   book: new Redis(180),
// };

// export default redisHelper;
