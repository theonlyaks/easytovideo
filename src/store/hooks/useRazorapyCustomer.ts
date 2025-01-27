import { useState } from 'react';
import { PlansService } from '@/services/firebase/plans';

export const useRazorpayCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrCreateCustomer = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      // First check if customer exists in Firestore
      const existingCustomer = await PlansService.getCustomerById(userId);
      if (existingCustomer?.customer_id) {
        return existingCustomer.customer_id;
      }

      // If no existing customer, create new one via API
      const response = await fetch('/api/razorpay/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Save customer data with values from response
      await PlansService.saveCustomer(userId, {
        customer_id: data.customer_id,
        name: data.name,
        email: data.email
      });

      return data.customer_id;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to manage customer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getOrCreateCustomer,
    loading,
    error
  };
};
