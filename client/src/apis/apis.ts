import axios from 'axios';

const request = async (
  path: string,
  method: 'get' | 'post',
  data?: Record<string, unknown> | undefined
) => {
  try {
    const response = await axios({
      url: `http://localhost:3001/api${path}`,
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
  }
};
