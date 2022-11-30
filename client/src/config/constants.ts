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

export const USERS_LOCATION = {
  SEOUL: '서울특별시',
  GWACHEON: '과천시'
};

export const DEFAULT_COORDINATES = {
  latitude: 37.5656,
  longitude: 126.9769
};

export const GEOLOCATION_CONSTANTS = {
  MAXIMUMAGE: 15000,
  TIMEOUT: 12000
};

export const SEOUL_BOUNDS = {
  SW: {
    LATITUDE: 37.47,
    LONGITUDE: 126.84
  },
  NE: {
    LATITUDE: 37.65,
    LONGITUDE: 127.2
  }
};

export const MARKER_CLASS_NAME = 'marker';

export const Z_INDEX = {
  MODAL: 110,
  FILTER: 105
};

export const COLOR_PALETTE = {
  PRIMARY: '#6349FF',
  GREEN: '#43EB40',
  GREY20: '#EEEEEE'
};

interface InfoDetailTitle {
  [key: string]: string;
}

export const INFO_DETAIL_TITLE: InfoDetailTitle = {
  여유: '은(는) 놀기 좋아보여요 😊',
  보통: '은(는) 보통이에요 🙂',
  붐빔: '은(는) 붐비고 있어요 🤔',
  '매우 붐빔': '은(는) 사람이 매우 많아요 😡'
};
