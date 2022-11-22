import { Request, Response } from 'express';
import seoulService from '../services/seoul.service';

export default {
  cronAreas: async (_: Request, res: Response) => {
    try {
      const cityData = await seoulService.getCityData();
      const saveResult = await seoulService.savePopulationData(cityData);
      res.status(200).json({ ok: saveResult });
    } catch (error) {
      console.log(error);
      res.status(500).json({ ok: false });
    }
  },
  allAreas: async (_: Request, res: Response) => {
    try {
      // 데이터베이스에서 최근순 데이터 50개 가져오기
      await seoulService.getRecentPopulationData();
      res.status(200).json({ ok: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ ok: false });
    }
  }
};
