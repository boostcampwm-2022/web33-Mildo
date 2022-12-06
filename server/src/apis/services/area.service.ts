import areaRepository from '../repositories/area.repository';
import { AreaCoordinateTypes } from '../types/interfaces';

export default {
  getAllAreaCoordinate: async (): Promise<AreaCoordinateTypes | null> => {
    const result: AreaCoordinateTypes = {};
    try {
      const areas = await areaRepository.findAll();
      if (areas) {
        areas.map(area => {
          result[area.areaName] = {
            latitude: area.latitude,
            longitude: area.longitude
          };
        });
        return result;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getRelatedAreaInfo: async (
    areaName: string
  ): Promise<AreaCoordinateTypes | null> => {
    const result: AreaCoordinateTypes = {};
    try {
      const areas = await areaRepository.findByAreaName(areaName);
      if (areas) {
        areas.map(area => {
          result[area.areaName] = {
            latitude: area.latitude,
            longitude: area.longitude
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
