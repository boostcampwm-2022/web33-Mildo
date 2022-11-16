import express, { Request, Response } from 'express';
import apiRouter from './apis';

const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/apis', apiRouter);

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
