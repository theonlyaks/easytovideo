import { useState, useEffect, useRef } from 'react';
import { FeedbackService } from '@/services/studio/feedback';
import { FeedbackState } from '@/types';


export const useFeedback = (projectId: string, userId: string | undefined) => {
  const [state, setState] = useState<FeedbackState>({
    rating: null,
    comment: '',
    isSubmitting: false,
    showCommentInput: false,
    hasSubmitted: false // Initialize new state
  });
  
  // Update to use RefObject instead of MutableRefObject
  const feedbackIdRef = useRef<string | null>(null);

  // Fetch existing feedback on mount
  useEffect(() => {
    const fetchFeedback = async () => {
      if (!userId || !projectId) return;

      try {
        const feedback = await FeedbackService.getFeedback(projectId, userId);
        if (feedback && feedback.rating) {
          feedbackIdRef.current = feedback.id;
          setState(prev => ({
            ...prev,
            rating: feedback.rating,
            comment: feedback.comment || '',
            showCommentInput: false, // Don't show input if feedback exists
            hasSubmitted: true // Mark as submitted
          }));
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [projectId, userId]);

  const submitRating = async (rating: 'like' | 'dislike') => {
    if (!userId) return;

    const isChangingRating = state.rating !== rating;

    setState(prev => ({
      ...prev,
      rating,
      showCommentInput: isChangingRating, // Only show input if changing rating
      hasSubmitted: false // Reset submission state when changing rating
    }));

    // Pass feedbackIdRef.current which can be string | null
    FeedbackService.submitFeedback({
      projectId,
      userId,
      rating,
    }, feedbackIdRef.current);
  };

  const submitComment = async () => {
    if (!userId || !state.rating || !state.comment.trim()) return;

    // Optimistically update UI
    setState(prev => ({
      ...prev,
      showCommentInput: false,
      hasSubmitted: true // Mark as submitted after comment
    }));

    // Pass feedbackIdRef.current which can be string | null
    FeedbackService.submitFeedback({
      projectId,
      userId,
      rating: state.rating,
      comment: state.comment.trim()
    }, feedbackIdRef.current);
  };

  const setComment = (comment: string) => {
    setState(prev => ({ ...prev, comment }));
  };

  return {
    ...state,
    submitRating,
    submitComment,
    setComment
  };
};
