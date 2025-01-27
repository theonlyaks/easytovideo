import { useState } from 'react';
import { PlansService } from '@/services/firebase/plans';

export const useRazorpaySubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscription = async (userId: string, customerId: string, planId: string,subscriptionId:string | null,nextStart:number | null,amount:number,planName: string,) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/razorpay/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, planId,subscriptionId,nextStart,amount,planName})
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Save full subscription data to Firestore
      await PlansService.saveSubscription(userId, {
        ...data.subscription,
        customer_id: customerId
      });

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId: string,status:string | null) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/razorpay/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId,status })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Update subscription status in Firestore
      await PlansService.updateSubscriptionStatus(subscriptionId, 'cancelled');

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifySubscription = async (subscriptionId: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/razorpay/verify-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId })
      });

      const { subscription } = await response.json();
      console.log('Raw subscription data:', subscription);

      if (subscription.status === 'active' || subscription.status === 'authenticated') {
        // Add null checks and default values for all fields
        const subscriptionData = {
          status: subscription.status || 'active',
          planId: subscription.plan_id || null,
          currentStart: subscription.current_start || Date.now(),
          chargeAt: subscription.charge_at || null,
          amount: subscription.notes?.amount || 0,  // Ensure amount is never undefined
          subscriptionId: subscription.id || subscriptionId,
          planName: subscription.notes?.planName || 'Default Plan'
        };
        console.log('Processed subscription data:', subscriptionData);
        await PlansService.updateSubscriptionAfterPayment(subscriptionId, subscriptionData);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Verification failed:', err);
      return false;
    }
  };

  return {
    createSubscription,
    cancelSubscription,
    verifySubscription,  // Make sure this is included
    loading,
    error
  };
};
