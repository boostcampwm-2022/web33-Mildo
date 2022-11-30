import express, { Request, Response } from 'express';
import passport from 'passport';
import apiRouter from './apis';
import dotenv from 'dotenv';
import connectMongoDB from './apis/config/mongoDB';
import cors from 'cors';
import { DEVELOPMENT } from './apis/config/constants';
import passports from './apis/passport';
import expressSession from 'express-session';

dotenv.config();

const app = express();

const clientURL =
  process.env.NODE_ENV === DEVELOPMENT
    ? process.env.CLIENT_URL_DEVELOPMENT
    : process.env.CLIENT_URL_PRODUCTION;

connectMongoDB();

app.use(cors({ origin: clientURL, credentials: true }));
app.use(
  expressSession({
    secret: 'SECRET',
    cookie: { maxAge: 60 * 60 * 1000, secure: false },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passports();

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});
// passport 초기화, session 연결
app.use('/api', apiRouter);

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`[API SERVER] listening on *:${process.env.API_SERVER_PORT}`);
  console.log(`[NODE MODE] ${process.env.NODE_ENV}`);
  console.log(clientURL);
});
