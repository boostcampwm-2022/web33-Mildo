import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import apiRouter from './apis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

mongoose
  .connect(process.env.MONGODB_CONNECT_URI!)
  .then(() => {
    console.log('mongodb 연결됨');
  })
  .catch((e: Error) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
