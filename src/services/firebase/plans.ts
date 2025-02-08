import { db } from '@/lib/common/firebase';
import { collection,onSnapshot, query, where, orderBy, getDocs, doc, getDoc, setDoc, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { PlanProps } from '@/types';
import { Subscription } from '@/types';
import { SubscriptionState } from '@/store/atoms/subscriptionAtom';

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
          ...planData
        } as PlanProps);
      });

      return plans;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  }

  static async getCustomerById(userId: string) {
    try {
      const docRef = doc(db, "razorpay_customers", userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  static async saveCustomer(userId: string, customerData: {
    name: string;
    email: string;
    customer_id: string;
  }) {
    try {
      const now = Date.now();
      const docRef = doc(db, "razorpay_customers", userId);
      await setDoc(docRef, {
        name: customerData.name,
        email: customerData.email,
        customer_id: customerData.customer_id,
        created_at: now,
        updated_at: now
      }, { merge: true });
    } catch (error) {
      console.error('Error saving customer:', error);
      throw error;
    }
  }

  static async saveSubscription(userId: string, razorpayData: any): Promise<void> {
    try {
      const now = Date.now();
      const subscription: Subscription = {
        subscriptionId: razorpayData.id,
        userId: userId, // Add userId to subscription data
        planId: razorpayData.plan_id,
        status: razorpayData.status,
        customerId: razorpayData.customer_id,
        billing: {
          currentStart: razorpayData.current_start,
          currentEnd: razorpayData.current_end,
          chargeAt: razorpayData.charge_at,
          startAt: razorpayData.start_at,
          endAt: razorpayData.end_at,
          expireBy: razorpayData.expire_by
        }
      };

      const subscriptionData = {
        ...subscription,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Use collection reference and addDoc for auto-generated ID
      const subscriptionsRef = collection(db, "razorpay_subscriptions");
      await addDoc(subscriptionsRef, subscriptionData);
    } catch (error) {
      console.error('Error saving subscription:', error);
      throw error;
    }
  }

  static async getSubscriptionById(userId: string) {
    try {
      const docRef = doc(db, "subscriptions", userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      throw error;
    }
  }

  static async getSubscriptionsByUserId(userId: string) {
    try {
      const subscriptionsRef = collection(db, "razorpay_subscriptions");
      const q = query(subscriptionsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  }

  static subscriptionListener(subscriptionId: string, callback: (data: any) => void, onError: (error: any) => void) {
    console.log("Setting up listener for subscription:", subscriptionId);
    
    try {
      const subscriptionsRef = collection(db, "razorpay_subscriptions");
      const q = query(
        subscriptionsRef, 
        where("subscriptionId", "==", subscriptionId),
      );
      
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          try {
            if (!snapshot.empty) {
              const doc = snapshot.docs[0];
              const data = doc.data();
              console.log("Subscription update:", data);
              callback(data);
            } else {
              console.log("No subscription found with ID:", subscriptionId);
              callback({ status: 'not_found' });
            }
          } catch (err) {
            console.error("Error processing snapshot:", err);
            onError(err);
          }
        }, 
        (error) => {
          console.error("Snapshot listener error:", error);
          onError(error);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up subscription listener:", error);
      onError(error);
      // Return a no-op cleanup function
      return () => {};
    }
  }

  static async getActiveSubscription(userId: string): Promise<SubscriptionState | null> {
    try {
      const subscriptionsRef = collection(db, "razorpay_subscriptions");
      const q = query(
        subscriptionsRef, 
        where("userId", "==", userId),
        where("status", "in", ["active", "authenticated","cancelled"]),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          status: data.status,
          planId: data.planId || null,
          currentEnd: data.chargeAt || null,
          currentStart: data.currentStart || null,
          amount: data.amount || null,
          planName:data.planName || null,
          subscriptionId:data.subscriptionId || null,
          credit:0
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching active subscription:', error);
      throw error;
    }
  }

  static listenToActiveSubscription(userId: string, callback: (data: any) => void, onError: (error: any) => void) {
    try {
      const subscriptionsRef = collection(db, "razorpay_subscriptions");
      const q = query(
        subscriptionsRef, 
        where("userId", "==", userId),
        where("status", "in", ["active", "authenticated","cancelled"]),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          try {
            if (!snapshot.empty) {
              const doc = snapshot.docs[0];
              const data = doc.data();
              callback({
                status: data.status,
                planId: data.planId || null,
                currentEnd: data.chargeAt || null,
                currentStart: data.currentStart || null,
                amount: data.amount || null,
                planName:data.planName || null,
                subscriptionId:data.subscriptionId || null
              });
            } else {
              callback({
                status: 'inactive',
                planId: null
              });
            }
          } catch (err) {
            console.error("Error processing snapshot:", err);
            onError(err);
          }
        }, 
        onError
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up subscription listener:", error);
      onError(error);
      return () => {};
    }
  }

  static async updateSubscriptionStatus(subscriptionId: string, status: string): Promise<void> {
    try {
        const subscriptionsRef = collection(db, "razorpay_subscriptions");
        const q = query(subscriptionsRef, where("subscriptionId", "==", subscriptionId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            await setDoc(doc.ref, {
                // status,
                updatedAt: serverTimestamp()
            }, { merge: true });
        }
    } catch (error) {
        console.error('Error updating subscription status:', error);
        throw error;
    }
  }

  static async updateSubscriptionAfterPayment(subscriptionId: string, data: {
    status: string;
    planId: string | null;
    currentStart: number;
    chargeAt: number | null;
    amount: number;
    subscriptionId: string;
    planName: string;
  }): Promise<void> {
    try {
      // Validate data before saving
      const validatedData = {
        status: data.status,
        planId: data.planId || null,
        currentStart: data.currentStart || Date.now(),
        chargeAt: data.chargeAt || null,
        amount: data.amount || 0,  // Ensure amount has a default value
        subscriptionId: data.subscriptionId,
        planName: data.planName || 'Default Plan',
        updatedAt: serverTimestamp()
      };

      const subscriptionsRef = collection(db, "razorpay_subscriptions");
      const q = query(subscriptionsRef, where("subscriptionId", "==", subscriptionId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await setDoc(doc.ref, validatedData, { merge: true });
      }
    } catch (error) {
      console.error('Error updating subscription after payment:', error);
      throw error;
    }
  }

  static async getPlanCredits(pgPlanId: string): Promise<number> {
    const plansRef = collection(db, 'plans');
    const q = query(plansRef, where('price.pgPlanId', '==', pgPlanId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const planDoc = querySnapshot.docs[0];
      return planDoc.data().credits || 0;
    }
    
    return 0;
  }

  static async getPlanById(planId: string) {
    const plansRef = collection(db, 'plans');
    const q = query(plansRef, where('price.pgPlanId', '==', planId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const planDoc = querySnapshot.docs[0];
      return planDoc.data();
    }
    
    throw new Error('Plan not found');
  }
}
