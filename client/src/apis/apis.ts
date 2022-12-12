import axios from 'axios';

const apiServerURL =
  import.meta.env.VITE_CLIENT_ENV === 'development'
    ? import.meta.env.VITE_API_SERVER_URL_DEVELOPMENT
    : import.meta.env.VITE_API_SERVER_URL_PRODUCTION;

const request = async (
  path: string,
  method: 'get' | 'post' | 'delete',
  data?: Record<string, unknown> | undefined
) => {
  try {
    const response = await axios({
      url: `${apiServerURL}${path}`,
      method,
      withCredentials: true,
      data
    });

    return response.data;
  } catch (error) {
    return { ok: false };
  }
};

export default {
  getAllArea: () => {
    return request('/seoul', 'get');
  },
  getUsersLocation: (latitude: number, longitude: number) => {
    return request(`/naver?lng=${longitude}&lat=${latitude}`, 'get');
  },
  getWhetherUserLoggedIn: () => {
    return request('/auth', 'get');
  },
  getPastInformation: (areaName: string) => {
    return request(`/seoul/${areaName}`, 'get');
  },
  getRelatedAreaInfo: (areaName: string) => {
    return request(`/seoul/search?areaName=${areaName}`, 'get');
  },
  addBookmark: (areaName: string, userId: string) => {
    return request(`/auth/${userId}/bookmark/${areaName}`, 'post');
  },
  deleteBookmark: (areaName: string, userId: string) => {
    return request(`/auth/${userId}/bookmark/${areaName}`, 'delete');
  }
};
