import { toUnixTimestamp } from '@/lib/common/time';
import { PlansService } from '@/services/firebase/plans';
import { CreditsService } from '@/services/studio/credits';
import { useState } from 'react';

export const useRazorpayOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (planName: string,userId: string,) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();

       // Save full subscription data to Firestore
       await PlansService.saveOrder(userId, {...data});

       return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (
    userId: string,
    razorpay_order_id: string,
    creditsToAdd: number,
    currentCredit: number,
    planName: string,
    amount: number,
    durationInDays: number,
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      // Verify payment with backend
      const response = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: razorpay_order_id,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment verification failed');
      }
      const { order } = await response.json();


      if (order.status === 'paid') {
            const subscriptionData = {
            status: 'active',
            subscriptionId: razorpay_order_id,
            currentStart: toUnixTimestamp(),
            chargeAt: toUnixTimestamp(Date.now() + durationInDays * 24 * 60 * 60 * 1000),
            amount: amount || 0,  // Ensure amount is never undefined
            planName: planName || 'Default Plan',
            isCreditAdded:true
            };
            await CreditsService.updateCredits(userId, creditsToAdd, 'order_mode', {
            planName: planName
            });

            // console.log('Processed subscription data:', subscriptionData);
            await PlansService.updateSubscriptionAfterPayment(razorpay_order_id, subscriptionData);
            return true;
        }

      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify payment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    verifyPayment,
    loading,
    error
  };
};
