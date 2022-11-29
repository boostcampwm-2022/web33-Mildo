import { POPULATION_LEVEL_COLOR } from '../config/constants';
import { MarkerObjectTypes } from '../types/interfaces';

// eslint-disable-next-line import/prefer-default-export
export const createPinSvg = (populationLevel: string) => {
  return `<svg width="35" height="50" viewBox="0 0 35 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 19.181C34 21.5965 32.9892 24.6791 31.3657 28.0295C29.7552 31.3532 27.5979 34.8289 25.4253 37.9975C23.255 41.1627 21.0826 44.0023 19.4519 46.0516C18.6461 47.0642 17.9735 47.8826 17.5 48.4506C17.0265 47.8826 16.3539 47.0642 15.5481 46.0516C13.9174 44.0023 11.745 41.1627 9.57474 37.9975C7.40211 34.8289 5.24479 31.3532 3.63429 28.0295C2.01083 24.6791 1 21.5965 1 19.181C1 9.05163 8.47165 1 17.5 1C26.5283 1 34 9.05163 34 19.181Z" fill="${POPULATION_LEVEL_COLOR[populationLevel].fill}" stroke="${POPULATION_LEVEL_COLOR[populationLevel].stroke}" stroke-width="2"/></svg>`;
};

export const createBigPinSvg = (populationLevel: string) => {
  return `<svg width="60" height="86" viewBox="0 0 60 86" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M59 32.8818C59 37.1889 57.2079 42.5932 54.4126 48.3621C51.6302 54.1042 47.9104 60.0952 44.1753 65.5426C40.4425 70.9865 36.7076 75.8684 33.905 79.3903C32.5041 81.1507 31.3371 82.5701 30.5211 83.5485C30.327 83.7812 30.1528 83.989 30 84.1704C29.8472 83.989 29.673 83.7812 29.4789 83.5485C28.6629 82.5701 27.4959 81.1507 26.095 79.3903C23.2924 75.8684 19.5575 70.9865 15.8247 65.5426C12.0896 60.0952 8.36979 54.1042 5.58742 48.3621C2.79208 42.5932 1 37.1889 1 32.8818C1 15.1857 14.0681 1 30 1C45.9319 1 59 15.1857 59 32.8818Z" fill="${POPULATION_LEVEL_COLOR[populationLevel].fill}" stroke="${POPULATION_LEVEL_COLOR[populationLevel].stroke}" stroke-width="2"/>
  </svg>
  `;
};

export const setMarkerIcon = (
  marker: MarkerObjectTypes,
  populationLevel: string
) => {
  marker.setIcon({
    content: `<div>${createPinSvg(populationLevel)}</div>`,
    size: new naver.maps.Size(35, 50),
    anchor: new naver.maps.Point(17.5, 50),
    origin: new naver.maps.Point(0, 0)
  });
};

export const setBigMarkerIcon = (
  marker: MarkerObjectTypes,
  populationLevel: string
) => {
  marker.setIcon({
    content: `<div>${createBigPinSvg(populationLevel)}</div>`,
    size: new naver.maps.Size(60, 85),
    anchor: new naver.maps.Point(30, 85),
    origin: new naver.maps.Point(0, 0)
  });
};
