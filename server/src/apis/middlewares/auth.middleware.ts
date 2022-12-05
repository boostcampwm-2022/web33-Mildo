import { Request, Response, NextFunction } from 'express';

export default {
  authorizationUser: (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (req.user) {
      return next();
    }
    return res.json({
      message: '세션이 만료되었습니다.'
    });
  }
};
