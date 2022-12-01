import passport from 'passport';
import naver from './naverStrategy';

import { UserSchemaTypes } from '../types/interfaces';
import User from '../models/User';

declare global {
  namespace Express {
    export interface User extends UserSchemaTypes {}
  }
}

export default () => {
  // 로그인이 최초로 성공했을 때만 호출되는 함수
  // done(null, user.id)로 세션을 초기화 한다.
  passport.serializeUser(
    (user: Express.User, done: (err: any, id?: unknown) => void) => {
      done(null, user._id?.toString());
    }
  );

  // 사용자가 페이지를 방문할 때마다 호출되는 함수
  // done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
  passport.deserializeUser(
    async (
      id: string,
      done: (err: any, user?: false | Express.User | null | undefined) => void
    ) => {
      let exUser = null;
      try {
        exUser = await User.findById(id);
        if (!exUser) {
          done(null, false);
          return;
        }
        done(null, exUser); // user 객체 말고 id를 넣는게 메모리 관점에서 좋지 않을까?
      } catch (error) {
        done(error, false);
      }
    }
  );
  naver();
};
