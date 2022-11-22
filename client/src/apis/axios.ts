import axios from 'axios';

// 나중에 .env로 빼내어야 함
const serverURL = 'http://localhost:3001';

const fetchGeocodeFromCoords = async (lat: number, lng: number) => {
  try {
    const data = await axios.get(
      `${serverURL}/api/naver?lng=${lng}&lat=${lat}`
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default fetchGeocodeFromCoords;
