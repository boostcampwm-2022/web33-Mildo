import { PopulationSchemaTypes } from './../types/interfaces';
import Population from '../models/Population';

export default {
  saveMany: async (cityData: PopulationSchemaTypes[]) => {
    try {
      const temp = await Population.insertMany(cityData);
      console.log(`[MONGODB] INSERTED ${temp}`);
    } catch (e) {
      console.log(`[MONGODB] ERROR ${e}`);
    }
  }
};
