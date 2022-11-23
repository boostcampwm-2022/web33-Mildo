import populationRepository from '../repositories/population.repository';
import { AreaPopulationTypes } from '../types/interfaces';

export default {
  getRecentAreaPopulation: async (): Promise<AreaPopulationTypes | null> => {
    const result: AreaPopulationTypes = {};
    try {
      const areaPopulation = await populationRepository.findRecent();
      if (areaPopulation) {
        areaPopulation.map(populationInfo => {
          result[populationInfo.areaName] = {
            populationMax: populationInfo.populationMax,
            populationMin: populationInfo.populationMin,
            populationLevel: populationInfo.populationLevel,
            populationTime: populationInfo.populationTime
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
