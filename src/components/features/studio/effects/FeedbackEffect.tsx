import Button from '@/components/common/Button';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useFeedback } from '@/store/hooks/useFeedback';
import { FeedbackEffectProps } from '@/types';

export function FeedbackEffect({ projectId, userId }: FeedbackEffectProps) {
  const {
    rating,
    comment,
    isSubmitting,
    showCommentInput,
    hasSubmitted,
    submitRating,
    submitComment,
    setComment
  } = useFeedback(projectId, userId);

  return (
    <div className="space-y-4 pt-4 border-t border-muted">
      <div>
        <h3 className="font-medium mb-1">How did we do?</h3>
        <p className="text-md text-muted-text">
          {rating ? 'Thanks for your feedback!' : 'Your feedback helps us improve'}
        </p>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => submitRating('like')}
          className={`p-2.5 rounded-full transition-colors flex-1 border ${
            rating === 'like'
              ? 'bg-accent text-white border-accent'
              : 'border-muted hover:bg-accent/10'
          }`}
          disabled={isSubmitting}
        >
          <FiThumbsUp className="w-5 h-5 mx-auto" />
        </button>
        
        <button
          onClick={() => submitRating('dislike')}
          className={`p-2.5 rounded-full transition-colors flex-1 border ${
            rating === 'dislike'
              ? 'bg-primary/50 text-white border-bg-primary/50'
              : 'border-muted hover:bg-primary/10'
          }`}
          disabled={isSubmitting}
        >
          <FiThumbsDown className="w-5 h-5 mx-auto" />
        </button>
      </div>

      {showCommentInput && !hasSubmitted && (
        <div className="space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience (optional)"
            className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px] text-sm"
          />
          {comment && (
            <Button
              onClick={submitComment}
              isLoading={isSubmitting}
              className="w-full"
              size="sm"
            >
              Submit Feedback
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
