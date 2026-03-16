import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '@/lib/data';

const EditorsPick = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const picks = getArticles().slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="container-blog py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 id="editors-pick-heading" className="section-title mb-0">Editor's Pick</h2>
        <div className="flex space-x-2" role="group" aria-label="Navigation controls">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full h-9 w-9"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full h-9 w-9"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-5 overflow-x-auto scrollbar-hide pb-4"
        role="region"
        aria-label="Editor's picks carousel"
        tabIndex={0}
      >
        {picks.map((pick) => (
          <article
            key={pick.id}
            className="flex-shrink-0 w-80 bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
          >
            <Link
              to={`/blog/${pick.slug}`}
              className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
              aria-label={`Read article: ${pick.title}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={pick.image}
                  alt={pick.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{pick.category}</span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-[10px] text-muted-foreground">{pick.readTime}</span>
                </div>
                
                <h3 className="text-base font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {pick.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {pick.excerpt}
                </p>
                
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-[10px] font-medium">{pick.author.charAt(0)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{pick.author}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EditorsPick;
