import { atomsWithQuery } from 'jotai-tanstack-query';
import { atom } from 'jotai';

import { UserInfoTypes } from '../types/interfaces';
import apis from '../apis/apis';

interface GetUserResponseTypes {
  ok: boolean;
  data: UserInfoTypes;
}

export const userBookmarkAtom = atom({});

export const [userInfoAtom] = atomsWithQuery(get => ({
  queryKey: ['users', get(userBookmarkAtom)],
  queryFn: async (): Promise<GetUserResponseTypes> => {
    const data = await apis.getWhetherUserLoggedIn();

    return data;
  }
}));
