import express, { Request, Response } from 'express';
import apiRouter from './apis';
import dotenv from 'dotenv';
import connectMongoDB from './apis/config/mongoDB';

dotenv.config();

const app = express();

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

connectMongoDB();
app.use('/api', apiRouter);

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`[API SERVER] listening on *:${process.env.API_SERVER_PORT}`);
});
