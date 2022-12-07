import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { UserSchemaTypes } from '../types/interfaces';

export default {
  getUserAuth: async (req: Request, res: Response) => {
    if (!req.user) {
      return;
    }

    const { _id, nickname, bookmarks }: UserSchemaTypes = req.user;

    res.json({ ok: true, data: { _id, nickname, bookmarks } });
  },
  addBookmark: async (req: Request, res: Response) => {
    const { areaName, userId } = req.params;

    if (req.user && req.user.bookmarks.length >= 5) {
      res
        .status(200)
        .send({ ok: false, message: '북마크는 5개 이상 등록할 수 없습니다.' });
      return;
    }

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
