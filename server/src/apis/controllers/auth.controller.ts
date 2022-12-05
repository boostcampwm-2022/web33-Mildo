import { Request, Response } from 'express';
import authService from '../services/auth.service';

export default {
  getUserAuth: async (_: Request, res: Response) => {
    res.json({ ok: true });
  },
  getUserInfo: async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const userInfo = await authService.getUserInfo(userId);
      res.status(200).send({ data: userInfo });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: '유저 정보 호출에 실패하였습니다! :('
      });
    }
  }
};
