import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { AREA_NAMES } from '../config/constants';

dotenv.config();

const router = express.Router();

router.get('/', async (_: Request, res: Response) => {
  let count = 0;
  const result = await Promise.all(
    Object.keys(AREA_NAMES).map(async area => {
      console.log(area);
      const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_CITY_API_ACCESS_KEY}/json/citydata/1/5/${area}`;

      try {
        const { data } = await axios({ url: url, method: 'get' });
        console.log(++count);
        return data;
      } catch (err) {
        return false;
      }
    })
  );
  if (count === 50) {
    res.send({ message: '성공', data: result });
    return;
  }
  res.send({ message: '실패' });
});

router.get('/:areaName', async (req: Request, res: Response) => {
  const { areaName } = req.params;
  const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_CITY_API_ACCESS_KEY}/xml/citydata/1/5/${areaName}`;

  try {
    const { data } = await axios({
      url: url,
      method: 'get'
    });

    res.send({ message: '성공', data });
  } catch (err) {
    res.send({ message: '실패' });
  }
});

export default router;
