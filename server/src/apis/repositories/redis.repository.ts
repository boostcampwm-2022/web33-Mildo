import { redisClient } from '../config/redis.connect';

export default {
  get: async (populationTime: string): Promise<string | null> => {
    try {
      return await redisClient.get(populationTime);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getRecentPopulationDate: async (): Promise<string | null> => {
    try {
      return await redisClient.get('recent');
    } catch (e) {
      console.log(e);
    }
    return null;
  },
  getRecentInfo: async (): Promise<string | null> => {
    try {
      const recentKey = await redisClient.get('recent');

      if (recentKey) {
        return await redisClient.get(recentKey);
      }
      return null;
    } catch (e) {
      console.log(e);
    }
    return null;
  },
  getAllKeys: async (): Promise<string[] | null> => {
    try {
      return await redisClient.keys('*');
    } catch (e) {
      console.log(e);
    }
    return null;
  }
};
