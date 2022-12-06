import { atom } from 'jotai';

import { UserInfoTypes } from '../types/interfaces';

// eslint-disable-next-line
export const userInfoAtom = atom<UserInfoTypes | null>(null);
