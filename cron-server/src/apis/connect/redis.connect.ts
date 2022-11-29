import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    connectTimeout: 50000
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD
});

redisClient.on('connect', () => {
  console.log('연결됨');
});

redisClient.on('error', err => {
  console.log(err);
});

export const connectRedis = async () => {
  await redisClient.connect();
  return;
};
