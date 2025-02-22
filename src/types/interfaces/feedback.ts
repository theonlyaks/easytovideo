export interface FeedbackData {
    projectId: string;
    userId: string;
    rating: 'like' | 'dislike';
    comment?: string;
    createdAt?: any;
    updatedAt?: any;
  }

export  interface FeedbackEffectProps {
    projectId: string;
    userId?: string;
  }
    
export interface FeedbackState {
  rating: 'like' | 'dislike' | null;
  comment: string;
  isSubmitting: boolean;
  showCommentInput: boolean;
  hasSubmitted: boolean; // Add this new state
}  