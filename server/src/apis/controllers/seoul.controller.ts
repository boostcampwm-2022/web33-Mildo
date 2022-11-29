import { Request, Response } from 'express';
import seoulService from '../services/seoul.service';

export default {
  allAreas: async (_: Request, res: Response) => {
    try {
      // 데이터베이스에서 최근순 데이터 50개 가져오기
      const recentAreaInfo = await seoulService.getRecentAreaInfo();
      if (recentAreaInfo) {
        res.status(200).json({ ok: true, data: recentAreaInfo });
        return;
      }
    } catch (e) {
      console.log(e);
    }
    res.status(500).json({ ok: false });
  }
};
