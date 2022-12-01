import { redisClient } from '../connect/redis.connect';
import { AreaPopulationTypes } from '../types/interfaces';
import { REDIS_EXPIRIRATION } from '../config/constants';

export default {
  set: async (
    cityData: AreaPopulationTypes,
    populationTime: string
  ): Promise<boolean> => {
    try {
      await redisClient.setEx(
        populationTime,
        REDIS_EXPIRIRATION,
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
