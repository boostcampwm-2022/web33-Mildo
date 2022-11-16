import axios from 'axios';
import { SEOUL_CITY_API_BASE_URL } from '../config/api.config';

const axiosSeoulCity = axios.create({
  baseURL: SEOUL_CITY_API_BASE_URL
});

export const getAxiosSeoulArea = async (path: string) => {
  return await axiosSeoulCity(path).then(response => response.data);
};
