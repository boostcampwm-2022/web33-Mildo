import { Request, Response } from 'express';
import areaService from '../services/area.service';
import redisService from '../services/redis.service';
import seoulService from '../services/seoul.service';

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
    const redisPastInformation = await redisService.getPastInformation(
      areaName
    );
    if (!redisPastInformation) {
      const mongoPastInformation = await seoulService.getPastAreaPopulation(
        areaName
      );
      return res.status(200).json({ ok: true, data: mongoPastInformation });
    }
    const redisSortedInformation = await seoulService.getSortedPastInformation(
      redisPastInformation
    );

    return res.status(200).json({ ok: true, data: redisSortedInformation });
  },
  searchArea: async (req: Request, res: Response) => {
    const { areaName } = req.query;
    if (areaName === '') {
      res.status(200).json({ ok: true, data: {} });
      return;
    }
    try {
      const relatedAreaInfo = await areaService.getRelatedAreaInfo(
        areaName as string
      );
      if (relatedAreaInfo) {
        res.status(200).json({ ok: true, data: relatedAreaInfo });
        return;
      }
    } catch (error) {
      console.log(error);
    }
    res.status(500).json({ ok: false });
  }
};
