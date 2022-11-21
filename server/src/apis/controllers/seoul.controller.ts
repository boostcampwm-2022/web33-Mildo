// import { AREA_NAMES } from './../config/area.config';
import { Request, Response } from 'express';
import seoulService from '../services/seoul.service';

export default {
  allAreas: async (_: Request, res: Response) => {
    try {
      const cityData = await seoulService.getCityData();
      console.log(cityData);

      seoulService.savePopulationData(cityData);

      res.status(200).json({ ok: true, data: cityData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ ok: false });
    }
  }
};
