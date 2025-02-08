import { db } from '@/lib/common/firebase';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { UserCredits, CreditHistoryEntry,CreditHistoryDetails } from '@/types';

export class CreditsService {
  static async getUserCredits(userId: string): Promise<UserCredits> {
    const docRef = doc(db, 'credits', userId);
    const creditDoc = await getDoc(docRef);
    
    if (!creditDoc.exists()) {
      const newCredit: UserCredits = {
        credit: 1,
        userId,
        history: [{
          type: 'trial',
          amount: 1,
          timestamp: Date.now(),
          description: 'Trial Credit Added',
          newCredit: 1,
          previousCredit: 0
        }]
      };
      await setDoc(docRef, newCredit);
      return newCredit;
    }

    return creditDoc.data() as UserCredits;
  }

  static listenToCredits(
    userId: string,
    onUpdate: (credits: UserCredits) => void,
    onError?: (error: Error) => void
  ) {
    const docRef = doc(db, 'credits', userId);
    
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onUpdate(snapshot.data() as UserCredits);
        }
      },
      (error) => {
        console.error('Credits listener error:', error);
        onError?.(error);
      }
    );
  }

  static async updateCredits(
    userId: string, 
    creditsToAdd: number, 
    type: CreditHistoryEntry['type'],
    details: CreditHistoryDetails = {}
  ): Promise<void> {
    const docRef = doc(db, 'credits', userId);
    const creditDoc = await getDoc(docRef);
    const currentCredits = creditDoc.exists() ? (creditDoc.data() as UserCredits).credit : 0;
    const newTotal = currentCredits + creditsToAdd;

    // Create a clean history entry with no undefined values
    const cleanHistoryEntry: CreditHistoryEntry = {
      type,
      amount: creditsToAdd,
      timestamp: Date.now(),
      description: details.description || this.generateDescription(type, creditsToAdd, details.planName || null),
      previousCredit: currentCredits,
      newCredit: newTotal,
      planName: details.planName || null,
      usedCredit: details.usedCredit || null,
      projectId: details.projectId || null
    };

    // Debug log to check the entry
    console.log('Creating history entry:', cleanHistoryEntry);

    try {
      await updateDoc(docRef, {
        credit: newTotal,
        history: arrayUnion(cleanHistoryEntry)
      });
    } catch (error) {
      console.error('Failed to update credits:', error);
      console.error('History entry that caused error:', cleanHistoryEntry);
      throw error;
    }
  }

  private static generateDescription(
    type: CreditHistoryEntry['type'], 
    amount: number, 
    planName: string | null
  ): string {
    switch (type) {
      case 'trial':
        return 'Trial Credit Added';
      case 'plan_subscription':
        return `${amount} credits added from ${planName || 'subscription'}`;
      case 'plan_upgrade':
        return `${amount} additional credits added from upgrade to ${planName || 'new plan'}`;
      case 'plan_downgrade':
        return `Plan downgraded to ${planName || 'new plan'}`;
      case 'credit_used':
        return `${amount} credit used`;
      default:
        return 'Credit balance updated';
    }
  }
}
