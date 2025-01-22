import { db } from '@/lib/common/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { PlanProps } from '@/types';

export class PlansService {
  static async getActivePlans(): Promise<PlanProps[]> {
    try {
      const plansRef = collection(db, 'plans');
      const q = query(
        plansRef,
        where('status', '==', 'active'),
        orderBy('sortOrder')
      );

      const querySnapshot = await getDocs(q);
      const plans: PlanProps[] = [];

      querySnapshot.forEach((doc) => {
        const planData = doc.data();
        plans.push({
          id: doc.id,
          name: planData.name,
          displayName: planData.displayName,
          description: planData.description,
          type: planData.type,
          status: planData.status,
          version: planData.version,
          sortOrder: planData.sortOrder,
          isPopular: planData.isPopular,
          price: planData.price,
          limits: planData.limits,
          features: planData.features,
          metadata: planData.metadata
        } as PlanProps);
      });

      return plans;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  }
}
