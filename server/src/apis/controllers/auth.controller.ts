import { Request, Response } from 'express';

export default {
  getUserAuth: async (req: Request, res: Response) => {
    res.json({ ok: true, data: req.user });
  },
  getUserInfo: (req: Request, res: Response) => {
    try {
      res.status(200).send({ data: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: '유저 정보 호출에 실패하였습니다! :('
      });
    }
  }
};
