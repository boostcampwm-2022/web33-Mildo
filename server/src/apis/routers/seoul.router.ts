import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import xml2js from 'xml2js';

import seoulController from '../controllers/seoul.controller';
import { SEOUL_CITY_API_BASE_URL } from '../config/api.config';

dotenv.config();

const router = express.Router();

router.get('/', seoulController.allAreas);
router.get('/:areaName', seoulController.pastInfo);

router.get('/test/:areaName', async (req: Request, res: Response) => {
  const { areaName } = req.params;
  const url = `${SEOUL_CITY_API_BASE_URL}${areaName}`;
  try {
    const { data } = await axios({
      url: url,
      method: 'get'
    });
    const json = await xml2js.parseStringPromise(data);

    if (json['Map']) {
      res.send({ ok: false });
      return;
    }

    const { AREA_NM: areaName } = json['SeoulRtd.citydata']['CITYDATA'][0];
    const {
      AREA_PPLTN_MIN: min,
      AREA_PPLTN_MAX: max,
      AREA_CONGEST_LVL: level,
      PPLTN_TIME: time
    } = json['SeoulRtd.citydata']['CITYDATA'][0]['LIVE_PPLTN_STTS'][0][
      'LIVE_PPLTN_STTS'
    ][0];

    res.status(200).send({
      ok: true,
      data: {
        areaName: areaName[0],
        max: max[0],
        min: min[0],
        level: level[0],
        time: time[0]
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ ok: false });
  }
});

export default router;
