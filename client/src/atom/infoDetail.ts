import { atom } from 'jotai';
import { SortAllAreasTypes } from '../types/interfaces';

export const isInfoDetailModalOpenAtom = atom<boolean>(false);

export const firstInfoAtom = atom<SortAllAreasTypes | null>(null);
