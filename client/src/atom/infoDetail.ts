import { atom } from 'jotai';
import {
  SortAllAreasTypes,
  SecondLevelInfoCacheTypes
} from '../types/interfaces';

export const isInfoDetailModalOpenAtom = atom<boolean>(false);
export const firstLevelInfoAtom = atom<SortAllAreasTypes | null>(null);
export const prevFirstLevelInfoAtom = atom<SortAllAreasTypes | null>(null);

export const secondLevelInfoCacheAtom = atom<SecondLevelInfoCacheTypes>({});

export const isSecondLevelAtom = atom<boolean>(false);
