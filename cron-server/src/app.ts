import dotenv from 'dotenv';
import cron from 'node-cron';

import connectMongoDB from './apis/connect/mongodb.connect';
import cronController from './apis/controllers/cron.controller';
connectMongoDB();

dotenv.config();

cron.schedule(`0,30 * * * *`, cronController.cronSeoulData);
// cronController.cronSeoulData();
// import * as redis from 'redis';

// const redisClient = redis.createClient({
//   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
//   legacyMode: true // 반드시 설정 !!
// });
// redisClient.on('connect', () => {
//   console.info('Redis connected!');
// });
// redisClient.on('error', err => {
//   console.error('Redis Client Error', err);
// });
// redisClient.connect().then(); // redis v4 연결 (비동기)
// const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용
