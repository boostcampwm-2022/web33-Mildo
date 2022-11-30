import passport from 'passport';
import {
  Strategy as NaverStrategy,
  Profile as NaverProfile
} from 'passport-naver-v2';
import dotenv from 'dotenv';

import User from '../models/User';

dotenv.config();
console.log(process.env.OAUTH_NAVER_CLIENT_ID);
console.log(process.env.OAUTH_NAVER_CLIENT_SECRET);

export default () => {
  passport.use(
    'naver',
    new NaverStrategy(
      {
        clientID: process.env.OAUTH_NAVER_CLIENT_ID,
        clientSecret: process.env.OAUTH_NAVER_CLIENT_SECRET,
        callbackURL: '/api/naver/auth/callback'
      },
      // (error: Error, profile?: Profile) => void
      async (
        _: string,
        __: string,
        profile: NaverProfile,
        done: (error: any, user?: any, info?: any) => void
      ) => {
        try {
          const exUser = await User.findOne({
            snsId: profile.id,
            provider: 'naver'
          });
          if (exUser) {
            return done(null, exUser);
          } else {
            const newUser = await User.create({
              snsId: profile.id,
              provider: 'naver',
              email: profile.email
            });

            return done(null, newUser);
          }
        } catch (error) {
          done(error);
          return;
        }
      }
    )
  );
};
