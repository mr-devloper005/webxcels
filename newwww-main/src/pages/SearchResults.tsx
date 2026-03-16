import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContentCard from '@/components/cards/ContentCard';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllContent } from '@/lib/data';
import { motion } from 'framer-motion';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  const allContent = useMemo(() => getAllContent(), []);

  const filteredContent = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    return allContent.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.excerpt.toLowerCase().includes(q) ||
        c.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, allContent]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Search Results</h1>

          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-5 text-base border border-border"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>

        {query ? (
          <div>
            <p className="text-sm text-muted-foreground mb-6 max-w-4xl mx-auto">
              {filteredContent.length > 0
                ? `Found ${filteredContent.length} result${filteredContent.length !== 1 ? 's' : ''} for "${query}"`
                : `No results found for "${query}"`}
            </p>

            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredContent.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ContentCard item={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-foreground mb-4">No articles found</h2>
                <p className="text-muted-foreground mb-6">Try different search terms or browse all articles</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="outline" onClick={() => navigate('/posts')}>Browse All</Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-foreground mb-4">What are you looking for?</h2>
            <p className="text-muted-foreground mb-6">Enter a search term above or browse our latest content</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={() => navigate('/posts')}>Browse All</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
