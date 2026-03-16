import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { getAllContent } from '@/lib/data';
import HeroCarousel from './HeroCarousel';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(getAllContent());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleInput = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length > 1) {
      const q = value.toLowerCase();
      const allContent = getAllContent();
      setSuggestions(
        allContent.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags?.some(t => t.toLowerCase().includes(q))
        ).slice(0, 5)
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10 dark:from-primary/10 dark:via-background dark:to-accent/5" />

      <div className="relative container-blog py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">WebXcels</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Discover articles from creators worldwide
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                onFocus={() => query.trim().length > 1 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-4 py-6 text-base rounded-full border border-border bg-card/80 backdrop-blur-sm shadow-sm focus:shadow-md transition-shadow"
                aria-label="Search content"
              />
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors text-left"
                    onMouseDown={() => {
                      navigate(`/blog/${item.slug}`);
                    }}
                  >
                    <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.category} · Article</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                      Article
                    </span>
                  </button>
                ))}
              </div>
            )}
          </form>
        </motion.div>

        <HeroCarousel />
      </div>
    </section>
  );
};

export default HeroSection;

