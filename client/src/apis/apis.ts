import axios from 'axios';

const request = async (
  path: string,
  method: 'get' | 'post' | 'delete',
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
      return response.data;
    }

    if (response.status < 500) {
      return response.data;
    }

    if (response.status < 600) {
      return response.data;
    }
  } catch (error) {
    return null;
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
