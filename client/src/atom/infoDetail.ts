import { atom } from 'jotai';
import {
  SortAllAreasTypes,
  SecondLevelInfoCacheTypes
} from '../types/interfaces';

export const isInfoDetailModalOpenAtom = atom<boolean>(false);

export const firstLevelInfoAtom = atom<SortAllAreasTypes | null>(null);

export const secondLevelInfoCacheAtom = atom<SecondLevelInfoCacheTypes>({});
