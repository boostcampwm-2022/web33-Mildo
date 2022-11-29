import passport from 'passport';
import naver from './naverStrategy';

export default () => {
  // 로그인이 최초로 성공했을 때만 호출되는 함수
  // done(null, user.id)로 세션을 초기화 한다.
  passport.serializeUser(
    (user: Express.User, done: (err: any, id?: unknown) => void) => {
      console.log('최초의 로그인');
      console.log(user);
      done(null, user);
    }
  );

  // 사용자가 페이지를 방문할 때마다 호출되는 함수
  // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
  passport.deserializeUser(
    (
      user: Express.User,
      done: (err: any, user?: false | Express.User | null | undefined) => void
    ) => {
      console.log('이후의 로그인');
      console.log(user);
      done(null, user);
    }
  );

  naver();
};
