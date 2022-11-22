export interface CityDatatypes {
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
