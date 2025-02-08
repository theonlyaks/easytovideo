import { atom } from 'jotai';

export interface SubscriptionState {
  status: string | null;
  planId: string | null;
  currentStart: number | null;  // Remove undefined
  currentEnd: number | null; 
  amount: number | null;
  subscriptionId:string | null;
  planName: string | null;
  credit: number;
  error?: string;
}

export const subscriptionAtom = atom<SubscriptionState>({
  status: 'loading',
  planId: null,
  currentStart: null,
  amount: null,
  currentEnd: null,
  planName:null,
  subscriptionId:null,
  credit: 0
});
