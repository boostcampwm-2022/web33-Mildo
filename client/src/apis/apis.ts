import axios from 'axios';

const apiServerURL =
  process.env.REACT_APP_CLIENT_ENV === 'development'
    ? process.env.REACT_APP_API_SERVER_URL_DEVELOPMENT
    : process.env.REACT_APP_API_SERVER_URL_PRODUCTION;

const axiosInstance = axios.create({
  baseURL: `${apiServerURL}`,
  withCredentials: true
});

const request = async (
  path: string,
  method: 'get' | 'post' | 'delete',
  data?: Record<string, unknown> | undefined
) => {
  axiosInstance.interceptors.request.use(
    config => {
      config.method = method;
      if (data) {
        config.data = data;
      }

      return config;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  try {
    const response = await axiosInstance(path);

    return response.data;
  } catch (error) {
    console.warn(error);
  }

  axiosInstance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      console.log(error);
    }
  );

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
