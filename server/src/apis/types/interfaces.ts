import { Types } from 'mongoose';

export interface CityDataTypes {
  areaName: string;
  populationMax: string;
  populationMin: string;
  populationLevel: string;
  populationTime: string;
}

export interface PopulationSchemaTypes {
  areaName: string;
  populationMax: number;
  populationMin: number;
  populationLevel: string;
  populationTime: Date;
  created?: Date;
}

export interface AreaSchemaTypes {
  areaName: string;
  latitude: number;
  longitude: number;
}

export interface AreaPopulationTypes {
  [areaName: string]: {
    populationMax: number;
    populationMin: number;
    populationLevel: string;
    populationTime: Date;
  };
}

export interface AreaCoordinateTypes {
  [areaName: string]: {
    latitude: number;
    longitude: number;
  };
}

export interface UserSchemaTypes {
  _id?: string;
  snsId: string;
  provider: string;
  email: string;
  nickname: string;
  bookmarks: Types.Array<string>;
}

export interface RedisAllAreasResponseTypes {
  [key: string]: {
    populationMin: number;
    populationMax: number;
    populationLevel: string;
  };
}
