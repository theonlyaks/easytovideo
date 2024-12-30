import { atom } from 'jotai';
import type { AudioLanguageData } from '@/types/';

export const audioLanguagesAtom = atom<AudioLanguageData[]>([]);
