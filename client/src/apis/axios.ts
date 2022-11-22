import axios from 'axios';

export const fetchGeocodeFromCoords = async () => {
  const data = await axios.get('/api/naver');
};
