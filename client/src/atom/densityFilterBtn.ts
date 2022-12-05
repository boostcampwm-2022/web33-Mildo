import { atom } from 'jotai';
import { FilterBtnStateTypes } from '../types/interfaces';

// eslint-disable-next-line import/prefer-default-export
export const enableStateAtom = atom<FilterBtnStateTypes>({
  '매우 붐빔': true,
  붐빔: true,
  보통: true,
  여유: true
});
