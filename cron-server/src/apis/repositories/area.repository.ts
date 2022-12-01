import { AreaSchemaTypes } from './../types/interfaces';
import Area from '../models/Area';

export default {
  findAll: async (): Promise<AreaSchemaTypes[] | null> => {
    let allAreas: AreaSchemaTypes[] | null = null;
    try {
      allAreas = await Area.find({});
    } catch (error) {
      console.log(error);
    }
    return allAreas;
  }
};
