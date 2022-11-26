interface PopulationLevelColorTypes {
  [key: string]: {
    fill: string;
    stroke: string;
  };
}

export const POPULATION_LEVEL_COLOR: PopulationLevelColorTypes = {
  여유: { fill: '#43EB40', stroke: '#03A000' },
  보통: { fill: '#FFDB1D', stroke: '#B1A000' },
  붐빔: { fill: '#FF9900', stroke: '#BB7000' },
  '매우 붐빔': { fill: '#FF1E1E', stroke: '#970000' }
};

export const USERS_LOACTION = {
  SEOUL: '서울특별시',
  GWACHEON: '과천시'
};

export const DEFAULT_COORDINATES = {
  latitude: 37.5656,
  longitude: 126.9769
};

export const GEOLOCATION_CONSTANTS = {
  maximumAge: 15000,
  timeout: 12000
};

export const SEOUL_BOUNDS = {
  sw: {
    latitude: 37.47,
    longitude: 126.84
  },
  ne: {
    latitude: 37.65,
    longitude: 127.2
  }
};

export const MARKER_CLASS_NAME = 'marker';

export const Z_INDEX = {
  modal: 10
};

export const COLOR_PALETTE = {
  PRIMARY: '#6349FF',
  GREEN: '#43EB40',
  GREY20: '#EEEEEE'
};
