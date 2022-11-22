import axios from 'axios';
import dotenv from 'dotenv';

import { SEOUL_CITY_API_BASE_URL } from '../config/api.config';

dotenv.config();

const axiosSeoulCity = axios.create({
  baseURL: SEOUL_CITY_API_BASE_URL
});

export const getAxiosSeoulArea = async (path: string) => {
  return await axiosSeoulCity(path).then(response => response.data);
};

// 로직상 거의 차이가 없는데도 불구하고 계속해서 함수를 만들어야 하는 상황
// 리팩토링 불가피해 보임
export const getAxiosFromNaverApi = async (path: string) => {
  return await axios
    .get(path, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_PASSWORD
      }
    })
    .then(response => response.data);
};
