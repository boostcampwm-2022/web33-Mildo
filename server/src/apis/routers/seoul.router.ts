import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/', async (_: Request, res: Response) => {
  const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_CITY_API_ACCESS_KEY}/xml/citydata/1/5/광화문·덕수궁`;

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
