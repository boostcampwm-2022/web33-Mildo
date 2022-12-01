import express, { Request, Response } from 'express';
import apiRouter from './apis';
import dotenv from 'dotenv';
import connectMongoDB from './apis/config/mongodb.connect';
import cors from 'cors';
import { DEVELOPMENT } from './apis/config/constants';
import { connectRedis } from './apis/config/redis.connect';

dotenv.config();

const app = express();

const clientURL =
  process.env.NODE_ENV === DEVELOPMENT
    ? process.env.CLIENT_URL_DEVELOPMENT
    : process.env.CLIENT_URL_PRODUCTION;
app.use(cors({ origin: clientURL, credentials: true }));

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

connectMongoDB();
connectRedis();
app.use('/api', apiRouter);

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`[API SERVER] listening on *:${process.env.API_SERVER_PORT}`);
  console.log(`[NODE MODE] ${process.env.NODE_ENV}`);
  console.log(clientURL);
});
