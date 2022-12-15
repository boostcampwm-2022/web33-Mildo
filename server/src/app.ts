import express, { Request, Response } from 'express';
import passport from 'passport';
import cors from 'cors';
import expressSession from 'express-session';
import dotenv from 'dotenv';

import apiRouter from './apis';
import connectMongoDB from './apis/config/mongodb.connect';
import { DEVELOPMENT } from './apis/config/constants';
import passports from './apis/passport';
import { connectRedis } from './apis/config/redis.connect';

dotenv.config();

const app = express();

const clientURL =
  process.env.NODE_ENV === DEVELOPMENT
    ? process.env.CLIENT_URL_DEVELOPMENT
    : process.env.CLIENT_URL_PRODUCTION;

connectMongoDB();
connectRedis();

const SESSION_COOKIE_MAX_AGE = 60 * 60 * 1000;

app.use(
  cors({
    origin: clientURL,
    credentials: true
  })
);
app.use(
  expressSession({
    secret: `${process.env.SESSION_SECRET}`,
    cookie: { maxAge: SESSION_COOKIE_MAX_AGE, secure: false },
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

app.use('/api', apiRouter);

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`[API SERVER] listening on *:${process.env.API_SERVER_PORT}`);
  console.log(`[NODE MODE] ${process.env.NODE_ENV}`);
});
