import axios from 'axios';

// 나중에 .env로 빼내어야 함
const serverURL = 'http://localhost:3001';

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

// https://ifh.cc/g/RQcSZX.gif

export default fetchGeocodeFromCoords;
