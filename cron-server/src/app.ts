import dotenv from 'dotenv';
import cron from 'node-cron';

import connectMongoDB from './apis/connect/mongodb.connect';
import cronController from './apis/controllers/cron.controller';
connectMongoDB();

dotenv.config();

cron.schedule(`0,30 * * * *`, cronController.cronSeoulData);
