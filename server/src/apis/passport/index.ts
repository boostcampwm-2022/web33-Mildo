// import passport from 'passport';
import naver from './naverStrategy';

export default () => {
  //   passport.serializeUser(
  //     (_, done: (error: any, user?: any, info?: any) => void) => {
  //       done(null);
  //     }
  //   );

  //   passport.deserializeUser(
  //     (_, done: (error: any, user?: any, info?: any) => void) => {
  //       done(null);
  //     }
  //   );

  naver();
};
