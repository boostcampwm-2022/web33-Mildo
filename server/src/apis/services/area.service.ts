import { AreaSchemaTypes } from './../types/interfaces';
import areaRepository from '../repositories/area.ropository';

export default {
  getAllCoordinate: async (): Promise<AreaSchemaTypes[] | null> => {
    try {
      const areas = await areaRepository.findAll();
      if (areas) {
        return areas.map((area: AreaSchemaTypes) => ({
          areaName: area.areaName,
          latitude: area.latitude,
          longitude: area.longitude
        }));
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
};
