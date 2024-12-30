import { atom } from 'jotai';

export interface UserState {
  id: string;
  name: string;
  email: string;
}

export const userAtom = atom<UserState | null>(null);
export const isLoadingAtom = atom<boolean>(false);
