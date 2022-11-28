import { PopulationSchemaTypes } from './../types/interfaces';
import Population from '../models/Population';

export default {
  saveMany: async (
    cityData: PopulationSchemaTypes[]
  ): Promise<PopulationSchemaTypes[] | null> => {
    let insertedPopulationData: PopulationSchemaTypes[] | null = null;
    try {
      insertedPopulationData = await Population.insertMany(cityData);
    } catch (error) {
      throw error;
    }
    return insertedPopulationData;
  }
};
