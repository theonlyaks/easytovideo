import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { subscriptionAtom, SubscriptionState } from '../atoms/subscriptionAtom';
import { PlansService } from '@/services/firebase/plans';
import { useSession } from 'next-auth/react';

export const useSubscriptionListener = () => {
  const [subscription, setSubscription] = useAtom(subscriptionAtom);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchSubscription = async () => {
      try {
        const activeSub = await PlansService.getActiveSubscription(session.user.id);
        setSubscription(activeSub || {
          status: 'inactive',
          planId: null,
          currentStart: null,
          currentEnd: null,
          amount: null,
          subscriptionId:null

        });
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
        setSubscription({
          status: 'error',
          planId: null,
          currentStart: null,
          currentEnd: null,
          amount: null,
          subscriptionId:null,
          error: 'Failed to fetch subscription'
        });
      }
    };

    fetchSubscription();

    const unsubscribe = PlansService.listenToActiveSubscription(
      session.user.id,
      (data: SubscriptionState) => {
        console.log("Active subscription update:", data);
        setSubscription(data);
      },
      (error) => {
        console.error("Subscription listener error:", error);
        setSubscription({
          status: 'error',
          planId: null,
          currentStart: null,
          currentEnd: null,
          amount: null,
          subscriptionId:null,
          error: error.message
        });
      }
    );

    return () => unsubscribe();
  }, [session?.user?.id, setSubscription]);

  return subscription;
};
