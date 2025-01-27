import { useState, useEffect } from 'react';
import { PlansService } from '@/services/firebase/plans';
import { PlanProps } from '@/types';

export function usePlans() {
  const [plans, setPlans] = useState<PlanProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const activePlans = await PlansService.getActivePlans();
        setPlans(activePlans);
        setError(null);
      } catch (err) {
        setError('Failed to fetch plans. Please try again later.');
        console.error('Error in usePlans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
}
