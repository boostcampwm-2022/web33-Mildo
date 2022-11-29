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
  getRecent: async (): Promise<string | null> => {
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
  }
};
