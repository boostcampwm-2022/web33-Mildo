import redisRepository from '../repositories/redis.repository';
import {
  AreaPopulationTypes,
  CityDataTypes,
  RedisAllAreasResponseTypes
} from '../types/interfaces';

export default {
  getRecentAreaPopulation: async (): Promise<AreaPopulationTypes | null> => {
    const result: AreaPopulationTypes = {};
    try {
      const redisRecentAreaPopulation = await redisRepository.getRecentInfo();
      if (!redisRecentAreaPopulation) {
        return null;
      }
      const areaPopulationJson = JSON.parse(redisRecentAreaPopulation);
      const areaPopulation: CityDataTypes[] = Object.values(areaPopulationJson);

      if (areaPopulation) {
        areaPopulation.forEach((populationInfo: CityDataTypes) => {
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
  },
  getPastInformation: async (
    areaName: string
  ): Promise<RedisAllAreasResponseTypes | null> => {
    const keys = await redisRepository.getAllKeys();

    if (!keys) {
      return null;
    }

    const filteredKeys = keys.filter((item: string) => item !== 'recent');

    const areasPromise = filteredKeys.map(async key => {
      const valueJson = await redisRepository.get(key);
      if (!valueJson) {
        return null;
      }
      return JSON.parse(valueJson);
    });

    const response: RedisAllAreasResponseTypes = {};
    const areas = await Promise.all(areasPromise);
    areas.map(area => {
      const target = area[areaName];
      const populationTime = target.populationTime;
      response[populationTime] = {
        populationMin: target.populationMin,
        populationMax: target.populationMax,
        populationLevel: target.populationLevel
      };
    });

    return response;
  }
};
