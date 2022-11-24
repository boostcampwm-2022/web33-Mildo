interface PopulationLevelColorTypes {
  [key: string]: {
    fill: string;
    stroke: string;
  };
}

// eslint-disable-next-line import/prefer-default-export
export const POPULATION_LEVEL_COLOR: PopulationLevelColorTypes = {
  여유: { fill: '#43EB40', stroke: '#03A000' },
  보통: { fill: '#FFDB1D', stroke: '#B1A000' },
  붐빔: { fill: '#FF9900', stroke: '#BB7000' },
  '매우 붐빔': { fill: '#FF1E1E', stroke: '#970000' }
};
