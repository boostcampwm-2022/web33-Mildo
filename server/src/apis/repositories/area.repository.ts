import { AreaSchemaTypes } from '../types/interfaces';
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
  },
  findByAreaName: async (
    areaName: string
  ): Promise<AreaSchemaTypes[] | null> => {
    let findAreas: AreaSchemaTypes[] | null = null;
    try {
      findAreas = await Area.find({ areaName: { $regex: `${areaName}` } });
    } catch (error) {
      throw error;
    }
    return findAreas;
  }
};
