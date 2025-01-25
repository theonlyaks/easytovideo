export interface SubscriptionBilling {
  currentStart: number | null;
  currentEnd: number | null;
  chargeAt: number;
  startAt: number;
  endAt: number;
  expireBy: number;
}

export interface Subscription {
  subscriptionId: string;
  planId: string;
  status: 'created' | 'authenticated' | 'active' | 'pending' | 'halted' | 'cancelled' | 'completed' | 'expired';
  customerId: string;
  billing: SubscriptionBilling;
  userId: string;
}

export interface SubscriptionRazorpay {
  razorpayKeyId: string;
  subscription: {
    id: string;
    plan_id: string;
    status: string;
    customer_id: string;
    current_start: number | null;
    current_end: number | null;
    charge_at: number;
    start_at: number;
    end_at: number;
    expire_by: number;
    created_at: number;
  };
}
