import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { getAxiosFromNaverApi } from '../utils/axios';

dotenv.config();

export default {
  getGeoCodingFromCoords: async (req: Request, res: Response) => {
    const { lat, lng } = req.query;
    const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&sourcecrs=epsg:4326&orders=roadaddr&output=json`;
    try {
      const data = await getAxiosFromNaverApi(url);
      if (process.env.CLIENT_URL) {
        res.setHeader('Access-Control-Allow-origin', process.env.CLIENT_URL);
      }
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        message: '좌표값을 기반으로 주소를 가져오지 못했습니다! :('
      });
    }
  }
};
