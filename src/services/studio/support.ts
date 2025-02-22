import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/common/firebase';
import { SupportTicket } from '@/types';

export class SupportService {
  static async createSupportTicket(ticket: Omit<SupportTicket, 'status' | 'createdAt'>) {
    try {
      const supportRef = await addDoc(collection(db, 'support'), {
        ...ticket,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return supportRef.id;
    } catch (error) {
      throw error;
    }
  }
}
