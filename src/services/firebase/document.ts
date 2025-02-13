import { db } from '@/lib/common/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export class FirebaseDocumentService {
  static async getDocumentById<T>(collectionName: string, documentId: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as T;
      }
      
      return null;
    } catch (error) {
      //console.error(`Error fetching document from ${collectionName}:`, error);
      throw error;
    }
  }

  static async updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data);
    } catch (error) {
      //console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  }
}
