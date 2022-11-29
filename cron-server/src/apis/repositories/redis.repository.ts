import { redisClient } from '../connect/redis.connect';
import { AreaPopulationTypes } from '../types/interfaces';

export default {
  set: async (
    cityData: AreaPopulationTypes,
    populationTime: string
  ): Promise<boolean> => {
    try {
      await redisClient.setEx(
        populationTime,
        25 * 60 * 60,
        JSON.stringify(cityData)
      );
      await redisClient.set('recent', populationTime);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
