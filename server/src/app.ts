import express, { Request, Response } from 'express';
import apiRouter from './apis';
import dotenv from 'dotenv';
import connectMongoDB from './apis/config/mongoDB';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

connectMongoDB();
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
