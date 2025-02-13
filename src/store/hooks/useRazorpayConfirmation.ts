import { useState, useEffect } from 'react';
import { PlansService } from '@/services/firebase/plans';

export const useRazorpayConfirmation = (subscriptionId: string | null) => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subscriptionId) {
      // console.log("No subscription ID provided");
      return;
    }

    // console.log("Starting subscription listener for:", subscriptionId);

    const unsubscribe = PlansService.subscriptionListener(
      subscriptionId,
      (data) => {
        // console.log("Subscription update received:", data);
        setStatus(data.status);
        setLoading(data.status === 'created');
      },
      (error) => {
        //console.error("Subscription listening failed:", error);
        setError(error.message);
      }
    );

    return () => {
      // console.log("Cleaning up subscription listener");
      unsubscribe();
    };
  }, [subscriptionId]);

  return { status, loading, error };
};
