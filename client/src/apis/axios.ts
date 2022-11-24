import axios from 'axios';

axios.defaults.withCredentials = true;
// 나중에 .env로 빼내어야 함
const serverURL = 'http://118.67.143.49:3001';

const fetchGeocodeFromCoords = async (lat: number, lng: number) => {
  let data;

  try {
    if (lat && lng) {
      data = await axios.get(`${serverURL}/api/naver?lng=${lng}&lat=${lat}`);
    }
  } catch (error) {
    console.log(error);
  }

  return data?.data.results[0].region.area1.name;
};

export default fetchGeocodeFromCoords;
