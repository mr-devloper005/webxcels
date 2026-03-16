import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ReviewSectionProps {
  articleSlug: string;
}

const ReviewSection = ({ articleSlug }: ReviewSectionProps) => {
  const { user, openAuthModal, addReview, updateReview, deleteReview, getReviewsForArticle } = useAuthStore();
  const reviews = getReviewsForArticle(articleSlug);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editHoveredRating, setEditHoveredRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('signup');
      toast.info('Sign up to leave a review');
      return;
    }
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    addReview({
      userId: user.id,
      userName: user.name,
      articleSlug,
      rating,
      comment: comment.trim(),
    });
    toast.success('Review submitted!');
    setRating(0);
    setComment('');
  };

  const startEdit = (reviewId: string, currentRating: number, currentComment: string) => {
    setEditingId(reviewId);
    setEditRating(currentRating);
    setEditComment(currentComment);
    setEditHoveredRating(0);
  };

  const handleEditSave = (reviewId: string) => {
    if (editRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!editComment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    updateReview(reviewId, { rating: editRating, comment: editComment.trim() });
    toast.success('Review updated!');
    setEditingId(null);
    setEditComment('');
    setEditRating(0);
  };

  const handleDelete = (reviewId: string) => {
    deleteReview(reviewId);
    toast.success('Review deleted');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-foreground">Reviews</h2>

      <form onSubmit={handleSubmit} className="bg-muted/30 rounded-xl p-6 space-y-4">
        <p className="text-sm font-medium text-foreground">
          {user ? 'Leave a Review' : 'Sign in to leave a review'}
        </p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={cn(
                  'h-6 w-6 transition-colors',
                  (hoveredRating || rating) >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground/30'
                )}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={user ? 'Share your thoughts...' : 'Sign up to write a review'}
          className="w-full min-h-[100px] rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          disabled={!user}
          maxLength={500}
        />

        <Button type="submit" disabled={!user} size="sm">
          Submit Review
        </Button>
      </form>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card border border-border rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{review.userName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.userName}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'h-3.5 w-3.5',
                        review.rating >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground/20'
                      )}
                    />
                  ))}
                </div>
              </div>
              {editingId === review.id ? (
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditRating(star)}
                        onMouseEnter={() => setEditHoveredRating(star)}
                        onMouseLeave={() => setEditHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={cn(
                            'h-5 w-5 transition-colors',
                            (editHoveredRating || editRating) >= star
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground/30'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full min-h-[90px] rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    maxLength={500}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEditSave(review.id)}>Save</Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingId(null); setEditComment(''); }}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              )}

              {user?.id === review.userId && editingId !== review.id && (
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(review.id, review.rating, review.comment)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(review.id)}>Delete</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-6">No reviews yet. Be the first!</p>
      )}
    </div>
  );
};

export default ReviewSection;
