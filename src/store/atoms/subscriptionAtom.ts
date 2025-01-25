import { atom } from 'jotai';

export interface SubscriptionState {
  status: 'loading' | 'active' | 'inactive' | 'error';
  planId: string | null;
  error?: string;
}

export const subscriptionAtom = atom<SubscriptionState>({
  status: 'loading',
  planId: null
});
