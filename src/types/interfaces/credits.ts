export interface CreditHistoryEntry {
  type?: 'trial' | 'plan_subscription' | 'plan_upgrade' | 'plan_downgrade' | 'credit_used' | 'order_mode';
  amount?: number;
  timestamp?: number;
  description?: string;
  previousCredit?: number;
  newCredit?: number;
  planName?: string | null;  // Changed to null instead of undefined
  usedCredit?: number | null;  // Changed to null instead of undefined
  projectId?: string | null;  // Changed to null instead of undefined
}

export interface UserCredits {
  credit: number;
  userId: string;
  history?: CreditHistoryEntry[];
}

export interface CreditHistoryDetails {
  planName?: string;
  previousCredit?: number;
  usedCredit?: number;
  description?: string;
  projectId?: string;
  videoName?: string;
}