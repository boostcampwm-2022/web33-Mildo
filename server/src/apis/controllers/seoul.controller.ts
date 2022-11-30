import { Request, Response } from 'express';
import redisService from '../services/redis.service';
import seoulService from '../services/seoul.service';
import { RedisAllAreasResponseTypes } from '../types/interfaces';

export default {
  allAreas: async (_: Request, res: Response) => {
    try {
      // redis에서 최근순 데이터 50개 가져오기
      const recentAreaInfo = await seoulService.getRecentAreaInfo();
      if (recentAreaInfo) {
        res.status(200).json({ ok: true, data: recentAreaInfo });
        return;
      }
    } catch (e) {
      console.log(e);
    }
    res.status(500).json({ ok: false });
  },
  pastInfo: async (req: Request, res: Response) => {
    const { areaName } = req.params;
    const pastInfomation = await redisService.getPastInfomation(areaName);
    if (!pastInfomation) {
      return res.status(500).json({ ok: false });
    }

    const initObject: RedisAllAreasResponseTypes = {};
    const sortedInfomation = Object.keys(pastInfomation)
      .sort()
      .reduce((prev, key) => {
        prev[key] = pastInfomation[key];
        return prev;
      }, initObject);

    return res.status(200).json({ ok: true, data: sortedInfomation });
  }
};
