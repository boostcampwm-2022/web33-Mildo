import redisRepository from '../repositories/redis.repository';
import { CityDataTypes, AreaPopulationTypes } from '../types/interfaces';

export default {
  save: async (cityData: CityDataTypes[]) => {
    const result: AreaPopulationTypes = {};
    let populationTime = '';
    cityData.map(data => {
      populationTime === '' ? (populationTime = data.populationTime) : '';
      result[data.areaName] = {
        ...data,
        populationMin: +data.populationMin,
        populationMax: +data.populationMax,
        populationTime: new Date(data.populationTime)
      };
    });
    await redisRepository.set(result, populationTime);
  }
};
