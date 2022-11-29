import { redisClient } from '../connect/redis.connect';
import { PopulationSchemaTypes } from '../types/interfaces';

export default {
  set: async (
    cityData: PopulationSchemaTypes[],
    populationTime: string
  ): Promise<boolean> => {
    try {
      await redisClient.setEx(
        populationTime,
        25 * 60 * 60,
        JSON.stringify(cityData)
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  get: async (populationTime: string): Promise<string | null> => {
    try {
      return await redisClient.get(populationTime);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};
