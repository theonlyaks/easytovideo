import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { subscriptionAtom, SubscriptionState } from '../atoms/subscriptionAtom';
import { PlansService } from '@/services/firebase/plans';
import { CreditsService } from '@/services/studio/credits';
import { useSession } from 'next-auth/react';

export const useSubscriptionListener = () => {
  const [subscription, setSubscription] = useAtom(subscriptionAtom);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchInitialData = async () => {
      try {
        const [activeSub, userCredits] = await Promise.all([
          PlansService.getActiveSubscription(session.user.id),
          CreditsService.getUserCredits(session.user.id)
        ]);

        setSubscription({
          ...(activeSub || {
            status: 'inactive',
            planId: null,
            currentStart: null,
            currentEnd: null,
            amount: null,
            planName: null,
            subscriptionId: null
          }),
          credit: userCredits.credit
        });
      } catch (error) {
        //console.error('Failed to fetch initial data:', error);
        setSubscription({
          status: 'error',
          planId: null,
          currentStart: null,
          currentEnd: null,
          amount: null,
          subscriptionId: null,
          planName: null,
          credit: 0,
          error: 'Failed to fetch data'
        });
      }
    };

    fetchInitialData();

    // Set up subscription listener
    const unsubscribePlan = PlansService.listenToActiveSubscription(
      session.user.id,
      (data: SubscriptionState) => {
        // console.log("Subscription update:", data);
        setSubscription(prev => ({ ...data, credit: prev.credit }));
      },
      (error) => {
        //console.error("Subscription listener error:", error);
        setSubscription(prev => ({ 
          ...prev,
          status: 'error',
          error: error.message 
        }));
      }
    );

    // Set up credits listener
    const unsubscribeCredits = CreditsService.listenToCredits(
      session.user.id,
      (userCredits) => {
        // console.log("Credits update:", userCredits);
        setSubscription(prev => ({ ...prev, credit: userCredits.credit }));
      },
      (error) => {
        //console.error("Credits listener error:", error);
        setSubscription(prev => ({ 
          ...prev,
          credit: 0,
          error: error.message 
        }));
      }
    );

    // Cleanup both listeners
    return () => {
      unsubscribePlan();
      unsubscribeCredits();
    };
  }, [session?.user?.id, setSubscription]);

  return subscription;
};
