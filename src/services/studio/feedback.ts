import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/common/firebase';
import { FeedbackData } from '@/types';

export class FeedbackService {
  static async getFeedback(projectId: string, userId: string): Promise<(FeedbackData & { id: string }) | null> {
    const feedbackRef = collection(db, 'feedback');
    const q = query(
      feedbackRef,
      where('projectId', '==', projectId),
      where('userId', '==', userId)
    );

    const snapshot = await getDocs(q);
    return snapshot.empty ? null : {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data() as FeedbackData
    };
  }

  static async submitFeedback(
    feedback: Omit<FeedbackData, 'createdAt'>, 
    existingFeedbackId?: string | null
  ) {
    if (existingFeedbackId) {
      // Create update data without undefined values
      const updateData: Record<string, any> = {
        rating: feedback.rating,
        updatedAt: serverTimestamp()
      };

      // Only add comment if it exists
      if (feedback.comment?.trim()) {
        updateData.comment = feedback.comment.trim();
      }

      const feedbackRef = doc(db, 'feedback', existingFeedbackId);
      updateDoc(feedbackRef, updateData).catch(error => {
        console.error('Error updating feedback:', error);
      });
      return existingFeedbackId;
    } else {
      // For new feedback, only include comment if it exists
      const newFeedback = {
        ...feedback,
        createdAt: serverTimestamp(),
      };

      if (!newFeedback.comment?.trim()) {
        delete newFeedback.comment;
      }

      const feedbackRef = await addDoc(collection(db, 'feedback'), newFeedback);
      return feedbackRef.id;
    }
  }
}
