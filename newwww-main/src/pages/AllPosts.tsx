import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContentCard from '@/components/cards/ContentCard';
import FilterDropdown from '@/components/FilterDropdown';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { getAllContent, getAllCategories } from '@/lib/data';
import { motion } from 'framer-motion';

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 20;
  const width = window.innerWidth;
  if (width >= 1280) return 20; // desktop
  if (width >= 1024) return 10; // laptop
  return 5; // mobile
};

const buildPageItems = (current: number, total: number) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: Array<number | string> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < total - 1) pages.push('...');
  pages.push(total);

  return pages;
};

const AllPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allContent = useMemo(() => getAllContent(), []);

  const filteredContent = useMemo(() => {
    let results = allContent;

    if (selectedCategory) {
      results = results.filter((c) => c.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.excerpt.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return results;
  }, [allContent, searchQuery, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredContent.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContent = filteredContent.slice(startIndex, startIndex + itemsPerPage);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const categoryOptions = useMemo(() => {
    return getAllCategories().map((category) => ({
      value: category,
      label: category,
      count: allContent.filter((item) => item.category === category).length,
    }));
  }, [allContent]);

  const pageItems = buildPageItems(currentPage, totalPages);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Explore All Articles
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover articles from creators worldwide
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border border-border"
            />
          </div>
          <FilterDropdown
            title="Category"
            options={categoryOptions}
            selectedValue={selectedCategory}
            onSelect={setSelectedCategory}
            placeholder="All Categories"
          />
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredContent.length} result{filteredContent.length !== 1 ? 's' : ''}
        </p>

        {paginatedContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedContent.map((item, i) => (
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
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-foreground mb-2">No articles found</h2>
            <p className="text-muted-foreground">Try adjusting your search</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center flex-wrap gap-2 mt-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!canPrev}
            >
              Previous
            </Button>
            {pageItems.map((item, index) =>
              typeof item === 'number' ? (
                <Button
                  key={`${item}-${index}`}
                  variant={item === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </Button>
              ) : (
                <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                  {item}
                </span>
              )
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={!canNext}
            >
              Next
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AllPosts;
