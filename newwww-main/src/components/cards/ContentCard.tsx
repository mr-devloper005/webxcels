import { Link } from 'react-router-dom';
import type { ContentItem } from '@/lib/data';
import FavoriteButton from '@/components/FavoriteButton';

interface ContentCardProps {
  item: ContentItem;
  compact?: boolean;
}

const ContentCard = ({ item, compact = false }: ContentCardProps) => {
  return (
    <article className="group">
      <Link
        to={`/blog/${item.slug}`}
        className="block bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`View article: ${item.title}`}
      >
        <div className={`relative overflow-hidden ${compact ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-foreground shadow-sm">
            Article
          </span>
          <FavoriteButton slug={item.slug} className="absolute top-3 right-3" />
        </div>

        <div className={`p-5 space-y-2.5 ${compact ? 'p-4' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {item.category}
            </span>
            {item.readTime && (
              <span className="text-[10px] text-muted-foreground">{item.readTime}</span>
            )}
          </div>

          <h3 className={`font-bold text-foreground leading-tight group-hover:text-primary transition-colors ${compact ? 'text-sm' : 'text-base'}`}>
            {item.title}
          </h3>

          {!compact && (
            <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
          )}

          <div className="flex items-center gap-2 pt-1">
            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
              <span className="text-[9px] font-medium">{item.author.charAt(0)}</span>
            </div>
            <span className="text-xs text-muted-foreground">{item.author}</span>
            <span className="text-xs text-muted-foreground">· {item.date}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ContentCard;
