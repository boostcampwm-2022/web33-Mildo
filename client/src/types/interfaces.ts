export interface MarkerObjectTypes {
  _nmarker_id?: string;
  setIcon: (
    icon:
      | string
      | naver.maps.ImageIcon
      | naver.maps.SymbolIcon
      | naver.maps.HtmlIcon
  ) => void;
}

export interface CoordinatesPopulationTypes {
  populationMax: number;
  populationMin: number;
  populationLevel: string;
  populationTime: Date;
  latitude: number;
  longitude: number;
}

export type SortAllAreasTypes = [string, CoordinatesPopulationTypes];

export interface SecondLevelTimeInfoCacheTypes {
  [date: string]: {
    populationLevel: string;
    populationMax: number;
    populationMin: number;
  };
}

export interface SecondLevelInfoCacheTypes {
  [areaName: string]: SecondLevelTimeInfoCacheTypes;
}

export interface BtnStyleTypes {
  bgColor: string;
  borderColor: string;
  enable: boolean;
}

export interface FilterListBtnProps {
  bgColor: string;
  borderColor: string;
  contents: string;
}

export interface FilterBtnStateTypes {
  '매우 붐빔': boolean;
  붐빔: boolean;
  보통: boolean;
  여유: boolean;
  [prop: string]: boolean;
}

export interface UserInfoTypes {
  _id: string;
  snsId: string;
  email: string;
  nickname: string;
  provider: string;
  bookmarks: string[];
}

export interface graphInfoResponseTypes {
  ok: boolean;
  data: SecondLevelTimeInfoCacheTypes;
}
