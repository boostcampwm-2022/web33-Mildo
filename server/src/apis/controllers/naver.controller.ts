import { Request, Response } from 'express';

import { getAxiosFromNaverApi } from '../utils/axios';

export default {
  getGeoCodingFromCoords: async (req: Request, res: Response) => {
    const { lat, lng } = req.query;
    const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&sourcecrs=epsg:4326&orders=roadaddr&output=json`;
    try {
      const data = await getAxiosFromNaverApi(url);
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
