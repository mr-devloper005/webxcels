import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  articleSlug: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  contentType: 'article';
  slug: string;
  body: string;
  date: string;
  parentId?: string | null;
}

interface AuthState {
  user: User | null;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  favorites: string[]; // item slugs
  reviews: Review[];
  comments: Comment[];
  login: (user: User) => void;
  logout: () => void;
  updateUser: (next: Partial<User>) => void;
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: 'login' | 'signup') => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  updateReview: (reviewId: string, next: Partial<Pick<Review, 'rating' | 'comment'>>) => void;
  deleteReview: (reviewId: string) => void;
  getReviewsForArticle: (slug: string) => Review[];
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
  updateComment: (commentId: string, body: string) => void;
  deleteComment: (commentId: string) => void;
  getCommentsForItem: (contentType: Comment['contentType'], slug: string) => Comment[];
  getCommentsByUser: (userId: string) => Comment[];
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthModalOpen: false,
      authModalTab: 'login',
      favorites: [],
      reviews: [],
      comments: [],

      login: (user) => set({ user, isAuthModalOpen: false }),
      logout: () => set({ user: null, favorites: [], reviews: [], comments: [] }),

      updateUser: (next) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...next };
        set({
          user: updated,
          reviews: get().reviews.map((review) =>
            review.userId === updated.id ? { ...review, userName: updated.name } : review
          ),
          comments: get().comments.map((comment) =>
            comment.userId === updated.id ? { ...comment, userName: updated.name } : comment
          ),
        });
      },

      openAuthModal: (tab = 'login') => set({ isAuthModalOpen: true, authModalTab: tab }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
      setAuthModalTab: (tab) => set({ authModalTab: tab }),

      toggleFavorite: (slug) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(slug)
            ? favorites.filter((s) => s !== slug)
            : [...favorites, slug],
        });
      },

      isFavorite: (slug) => get().favorites.includes(slug),

      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: crypto.randomUUID(),
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        };
        set({ reviews: [...get().reviews, newReview] });
      },

      updateReview: (reviewId, next) => {
        set({
          reviews: get().reviews.map((review) =>
            review.id === reviewId ? { ...review, ...next } : review
          ),
        });
      },

      deleteReview: (reviewId) => {
        set({ reviews: get().reviews.filter((review) => review.id !== reviewId) });
      },

      getReviewsForArticle: (slug) => get().reviews.filter((r) => r.articleSlug === slug),

      addComment: (comment) => {
        const newComment: Comment = {
          ...comment,
          id: crypto.randomUUID(),
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        };
        set({ comments: [...get().comments, newComment] });
      },

      updateComment: (commentId, body) => {
        set({
          comments: get().comments.map((comment) =>
            comment.id === commentId ? { ...comment, body } : comment
          ),
        });
      },

      deleteComment: (commentId) => {
        set({
          comments: get().comments.filter((comment) => comment.id !== commentId && comment.parentId !== commentId),
        });
      },

      getCommentsForItem: (contentType, slug) =>
        get().comments.filter((comment) => comment.contentType === contentType && comment.slug === slug),

      getCommentsByUser: (userId) =>
        get().comments.filter((comment) => comment.userId === userId),
    }),
    {
      name: 'webxcels-auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        favorites: state.favorites,
        reviews: state.reviews,
        comments: state.comments,
      }),
    }
  )
);

