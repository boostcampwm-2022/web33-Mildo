import axios from 'axios';

const request = async (
  path: string,
  method: 'get' | 'post',
  data?: Record<string, unknown> | undefined
) => {
  const apiServerURL =
    process.env.REACT_APP_CLIENT_ENV === 'development'
      ? process.env.REACT_APP_API_SERVER_URL_DEVELOPMENT
      : process.env.REACT_APP_API_SERVER_URL_PRODUCTION;

  try {
    const response = await axios({
      url: `${apiServerURL}${path}`,
      method,
      withCredentials: true,
      data
    });

    if (response.status < 300) {
      return response.data;
    }

    if (response.status < 400) {
      console.warn(`Redirection Error Code ${response.status}`);
      return response.data;
    }

    if (response.status < 500) {
      console.warn(`Client Error Code ${response.status}`);
      return response.data;
    }

    if (response.status < 600) {
      console.warn(`Server Error Code ${response.status}`);
      return response.data;
    }
  } catch (error) {
    console.warn(error);
  }

  return { ok: false };
};

export default {
  getAllArea: () => {
    return request('/seoul', 'get');
  },
  getUsersLocation: (latitude: number, longitude: number) => {
    return request(`/naver?lng=${longitude}&lat=${latitude}`, 'get');
  },
  getPastInfomation: (areaName: string) => {
    return request(`/seoul/${areaName}`, 'get');
  }
};
