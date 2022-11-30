import { atom } from 'jotai';
import { SortAllAreasTypes, SecondLevelInfoTypes } from '../types/interfaces';

export const isInfoDetailModalOpenAtom = atom<boolean>(false);

export const firstLevelInfoAtom = atom<SortAllAreasTypes | null>(null);

export const secondLevelInfoAtom = atom<SecondLevelInfoTypes>({});
