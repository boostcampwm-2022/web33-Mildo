import express, { Request, Response } from 'express';
import apiRouter from './apis';
import dotenv from 'dotenv';
import connectMongoDB from './apis/config/mongoDB';

dotenv.config();

const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

connectMongoDB();
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`[API SERVER] listening on *:${port}`);
});
