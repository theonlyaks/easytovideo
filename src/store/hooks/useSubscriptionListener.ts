import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { subscriptionAtom } from '../atoms/subscriptionAtom';
import { PlansService } from '@/services/firebase/plans';
import { useSession } from 'next-auth/react';

export const useSubscriptionListener = () => {
  const [subscription, setSubscription] = useAtom(subscriptionAtom);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    // Initial fetch
    const fetchSubscription = async () => {
      try {
        const activeSub = await PlansService.getActiveSubscription(session.user.id);
        setSubscription(activeSub || {
          status: 'inactive',
          planId: null
        });
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
        setSubscription({
          status: 'error',
          planId: null,
          error: 'Failed to fetch subscription'
        });
      }
    };

    fetchSubscription();

    // Set up real-time listener for active subscription
    const unsubscribe = PlansService.listenToActiveSubscription(
      session.user.id,
      (data) => {
        console.log("Active subscription update:", data);
        setSubscription(data);
      },
      (error) => {
        console.error("Subscription listener error:", error);
        setSubscription({
          status: 'error',
          planId: null,
          error: error.message
        });
      }
    );

    return () => unsubscribe();
  }, [session?.user?.id, setSubscription]);

  return subscription;
};
