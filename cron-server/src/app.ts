import dotenv from 'dotenv';
import cron from 'node-cron';

import { connectRedis } from './apis/connect/redis.connect';
import connectMongoDB from './apis/connect/mongodb.connect';
import cronController from './apis/controllers/cron.controller';

dotenv.config();

connectMongoDB();
connectRedis();

cron.schedule(`34 * * * *`, cronController.cronSeoulData);
