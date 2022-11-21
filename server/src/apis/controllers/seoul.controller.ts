import { AREA_NAMES } from './../config/area.config';
// import { TEST_AREA_NAMES } from '../config/area.config';
import { Request, Response } from 'express';
// import { AREA_NAMES } from '../config/area.config';
import xml2js from 'xml2js';
import { getAxiosSeoulArea } from '../utils/axios';
import { cityDataTypes } from '../types/interfaces';

export default {
  allAreas: async (_: Request, res: Response) => {
    try {
      const cityData: cityDataTypes[] = await Promise.all(
        Object.keys(AREA_NAMES).map(async areaName => {
          const data = await getAxiosSeoulArea(areaName);
          const json = await xml2js.parseStringPromise(data);

          if (json['Map']) {
            console.log(`실패: ${areaName}`);
            return {
              areaName: null,
              populationMin: null,
              populationMax: null,
              populationLevel: null,
              updatedAt: null
            };
          }
          console.log(`성공: ${areaName}`);
          const { AREA_NM } = json['SeoulRtd.citydata']['CITYDATA'][0];
          const {
            AREA_PPLTN_MIN,
            AREA_PPLTN_MAX,
            AREA_CONGEST_LVL,
            PPLTN_TIME
          } =
            json['SeoulRtd.citydata']['CITYDATA'][0]['LIVE_PPLTN_STTS'][0][
              'LIVE_PPLTN_STTS'
            ][0];

          return {
            areaName: AREA_NM[0],
            populationMin: AREA_PPLTN_MIN[0],
            populationMax: AREA_PPLTN_MAX[0],
            populationLevel: AREA_CONGEST_LVL[0],
            updatedAt: PPLTN_TIME[0]
          };
        })
      );
      res.status(200).json({ ok: true, data: cityData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ ok: false });
    }
  }
};
