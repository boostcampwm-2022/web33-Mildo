import { Request, Response, NextFunction } from 'express';

export default {
  authorizationUser: (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      return next();
    }
    return res.json({
      ok: true,
      data: {
        isLoggedIn: false,
        message: '세션이 만료되었습니다.'
      }
    });
  }
};
