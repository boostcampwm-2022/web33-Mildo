import passport from 'passport';
import {
  Strategy as NaverStrategy,
  Profile as NaverProfile
} from 'passport-naver-v2';
import dotenv from 'dotenv';

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
        console.log('naver profile : ', profile);
        console.log('naver Id : ', profile.id);
        console.log('naver Email : ', profile.email);
        done(null, profile);
      }
    )
  );
};
