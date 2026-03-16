import { Heart } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  slug: string;
  className?: string;
}

const FavoriteButton = ({ slug, className }: FavoriteButtonProps) => {
  const { user, isFavorite, toggleFavorite, openAuthModal } = useAuthStore();
  const favorited = isFavorite(slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openAuthModal('signup');
      toast.info('Sign up to save your favorites');
      return;
    }
    toggleFavorite(slug);
    toast.success(favorited ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110',
        favorited
          ? 'bg-red-500/90 text-white'
          : 'bg-card/80 text-muted-foreground hover:text-red-500',
        className
      )}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={cn('h-4 w-4', favorited && 'fill-current')} />
    </button>
  );
};

export default FavoriteButton;
