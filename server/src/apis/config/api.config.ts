import dotenv from 'dotenv';

dotenv.config();

export const SEOUL_CITY_API_BASE_URL = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_CITY_API_ACCESS_KEY_SUB}/xml/citydata/1/5/`;
