import { AreaSchemaTypes } from './../types/interfaces';
import Area from '../models/Area';

export default {
  findAll: async (): Promise<AreaSchemaTypes[] | null> => {
    let totalAreas: AreaSchemaTypes[] | null = null;
    try {
      totalAreas = await Area.find({});
    } catch (error) {
      throw error;
    }
    return totalAreas;
  }
};
