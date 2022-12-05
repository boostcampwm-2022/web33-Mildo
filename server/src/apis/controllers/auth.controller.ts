import { Request, Response } from 'express';
import authService from '../services/auth.service';

export default {
  getUserAuth: async (req: Request, res: Response) => {
    res.json({ ok: true, data: req.user });
  },
  addBookmark: async (req: Request, res: Response) => {
    const { areaName, userId } = req.params;
    try {
      await authService.addBookmark(areaName, userId);
      res.status(200).send({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: '북마크 등록에 실패하였습니다! :('
      });
    }
  },
  deleteBookmark: async (req: Request, res: Response) => {
    const { areaName, userId } = req.params;
    try {
      await authService.deleteBookmark(areaName, userId);
      res.status(200).send({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: '북마크 삭제에 실패하였습니다! :('
      });
    }
  }
};
