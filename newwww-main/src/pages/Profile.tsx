import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getBySlug } from '@/lib/data';
import { useAuthStore } from '@/store/auth-store';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const Profile = () => {
  const { toast } = useToast();
  const {
    user,
    openAuthModal,
    updateUser,
    favorites,
    toggleFavorite,
    reviews,
    updateReview,
    deleteReview,
    comments,
    updateComment,
    deleteComment,
  } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [avatarFileName, setAvatarFileName] = useState('');

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentBody, setEditingCommentBody] = useState('');

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingReviewRating, setEditingReviewRating] = useState(0);
  const [editingReviewComment, setEditingReviewComment] = useState('');
  const [editingReviewHover, setEditingReviewHover] = useState(0);

  const favoriteItems = useMemo(
    () => favorites.map((slug) => getBySlug(slug)).filter(Boolean),
    [favorites]
  );

  const userComments = useMemo(
    () => comments.filter((comment) => comment.userId === user?.id),
    [comments, user?.id]
  );

  const userReviews = useMemo(
    () => reviews.filter((review) => review.userId === user?.id),
    [reviews, user?.id]
  );

  const handleSaveProfile = () => {
    if (!user) return;
    if (!name.trim()) {
      toast({ title: 'Name required', description: 'Please enter your name.' });
      return;
    }
    if (!email.trim()) {
      toast({ title: 'Email required', description: 'Please enter your email.' });
      return;
    }
    updateUser({ name: name.trim(), email: email.trim(), avatar: avatar.trim() || undefined });
    toast({ title: 'Profile updated', description: 'Your details have been saved.' });
  };

  const handleAvatarUpload = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image file.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setAvatar(result);
      setAvatarFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const getLinkForItem = (_type: 'article', slug: string) => `/blog/${slug}`;

  const startEditComment = (commentId: string, body: string) => {
    setEditingCommentId(commentId);
    setEditingCommentBody(body);
  };

  const saveComment = (commentId: string) => {
    if (!editingCommentBody.trim()) {
      toast({ title: 'Comment required', description: 'Please enter a comment.' });
      return;
    }
    updateComment(commentId, editingCommentBody.trim());
    setEditingCommentId(null);
    setEditingCommentBody('');
    toast({ title: 'Comment updated', description: 'Your comment was saved.' });
  };

  const startEditReview = (reviewId: string, rating: number, comment: string) => {
    setEditingReviewId(reviewId);
    setEditingReviewRating(rating);
    setEditingReviewComment(comment);
    setEditingReviewHover(0);
  };

  const saveReview = (reviewId: string) => {
    if (editingReviewRating === 0) {
      toast({ title: 'Rating required', description: 'Please select a rating.' });
      return;
    }
    if (!editingReviewComment.trim()) {
      toast({ title: 'Comment required', description: 'Please write a review.' });
      return;
    }
    updateReview(reviewId, { rating: editingReviewRating, comment: editingReviewComment.trim() });
    setEditingReviewId(null);
    setEditingReviewRating(0);
    setEditingReviewComment('');
    toast({ title: 'Review updated', description: 'Your review was saved.' });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" className="container-blog py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Profile</h1>
          <p className="text-muted-foreground mb-6">Sign in to view and manage your profile, comments, and reviews.</p>
          <Button onClick={() => openAuthModal('login')}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12 space-y-10">
        <section className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your details and activity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Profile Photo</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAvatarUpload(e.target.files?.[0] || null)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setAvatar(''); setAvatarFileName(''); }}
                  >
                    Remove
                  </Button>
                </div>
                {avatarFileName && (
                  <p className="text-xs text-muted-foreground">Selected: {avatarFileName}</p>
                )}
              </div>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>

            <div className="bg-muted/30 border border-border rounded-xl p-6 space-y-4">
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <div className="rounded-xl border border-border bg-background overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-2xl font-semibold text-muted-foreground">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground break-all">{user.email}</p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Your Interests</h2>
          {favoriteItems.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {favoriteItems.map((item) => (
                <div key={item!.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase">{item!.type}</p>
                    <Link to={getLinkForItem(item!.type, item!.slug)} className="font-medium text-foreground hover:text-primary">
                      {item!.title}
                    </Link>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toggleFavorite(item!.slug)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">You have not saved any favorites yet.</p>
          )}
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Your Comments</h2>
          {userComments.length > 0 ? (
            <div className="space-y-4">
              {userComments.map((comment) => (
                <div key={comment.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">{comment.contentType}</p>
                      <Link to={getLinkForItem(comment.contentType, comment.slug)} className="text-sm font-medium text-foreground hover:text-primary">
                        View item
                      </Link>
                      <p className="text-xs text-muted-foreground">{comment.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => startEditComment(comment.id, comment.body)}>Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>Delete</Button>
                    </div>
                  </div>
                  {editingCommentId === comment.id ? (
                    <div className="space-y-3">
                      <Textarea value={editingCommentBody} onChange={(e) => setEditingCommentBody(e.target.value)} />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveComment(comment.id)}>Save</Button>
                        <Button variant="ghost" size="sm" onClick={() => { setEditingCommentId(null); setEditingCommentBody(''); }}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{comment.body}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">You have not posted any comments yet.</p>
          )}
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Your Reviews</h2>
          {userReviews.length > 0 ? (
            <div className="space-y-4">
              {userReviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Article</p>
                      <Link to={`/blog/${review.articleSlug}`} className="text-sm font-medium text-foreground hover:text-primary">
                        View article
                      </Link>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => startEditReview(review.id, review.rating, review.comment)}>Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteReview(review.id)}>Delete</Button>
                    </div>
                  </div>

                  {editingReviewId === review.id ? (
                    <div className="space-y-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditingReviewRating(star)}
                            onMouseEnter={() => setEditingReviewHover(star)}
                            onMouseLeave={() => setEditingReviewHover(0)}
                            className="transition-transform hover:scale-110"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              className={cn(
                                'h-5 w-5 transition-colors',
                                (editingReviewHover || editingReviewRating) >= star
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground/30'
                              )}
                            />
                          </button>
                        ))}
                      </div>
                      <Textarea value={editingReviewComment} onChange={(e) => setEditingReviewComment(e.target.value)} />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveReview(review.id)}>Save</Button>
                        <Button variant="ghost" size="sm" onClick={() => { setEditingReviewId(null); setEditingReviewComment(''); }}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              'h-4 w-4',
                              review.rating >= star
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground/20'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">You have not posted any reviews yet.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
