import redisRepository from '../repositories/redis.repository';
import { AreaPopulationTypes, CityDataTypes } from '../types/interfaces';

export default {
  getRecentAreaPopulation: async (): Promise<AreaPopulationTypes | null> => {
    const result: AreaPopulationTypes = {};
    try {
      const redisRecentAreaPopulation = await redisRepository.getRecent();
      if (!redisRecentAreaPopulation) {
        return null;
      }
      const areaPopulation: CityDataTypes[] = JSON.parse(
        redisRecentAreaPopulation
      );
      if (areaPopulation) {
        areaPopulation.map((populationInfo: CityDataTypes) => {
          result[populationInfo.areaName] = {
            populationMax: +populationInfo.populationMax,
            populationMin: +populationInfo.populationMin,
            populationLevel: populationInfo.populationLevel,
            populationTime: new Date(populationInfo.populationTime)
          };
        });
        return result;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
};
