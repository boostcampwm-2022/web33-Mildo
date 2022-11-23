import { POPULATION_LEVEL_COLOR } from '../config/constants';

// eslint-disable-next-line import/prefer-default-export
export const createPinSvg = (populationLevel: string) => {
  return `<svg width="35" height="50" viewBox="0 0 35 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 19.181C34 21.5965 32.9892 24.6791 31.3657 28.0295C29.7552 31.3532 27.5979 34.8289 25.4253 37.9975C23.255 41.1627 21.0826 44.0023 19.4519 46.0516C18.6461 47.0642 17.9735 47.8826 17.5 48.4506C17.0265 47.8826 16.3539 47.0642 15.5481 46.0516C13.9174 44.0023 11.745 41.1627 9.57474 37.9975C7.40211 34.8289 5.24479 31.3532 3.63429 28.0295C2.01083 24.6791 1 21.5965 1 19.181C1 9.05163 8.47165 1 17.5 1C26.5283 1 34 9.05163 34 19.181Z" fill="${POPULATION_LEVEL_COLOR[populationLevel].fill}" stroke="${POPULATION_LEVEL_COLOR[populationLevel].stroke}" stroke-width="2"/></svg>`;
};
