import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
