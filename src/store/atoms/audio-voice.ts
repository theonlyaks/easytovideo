import { atom } from 'jotai';
import type { AudioVoice } from '@/types';

export const audioVoicesAtom = atom<AudioVoice[]>([]);
