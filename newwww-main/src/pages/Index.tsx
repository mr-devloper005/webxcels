import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TrendingMasonry from '@/components/sections/TrendingMasonry';
import NewsletterSection from '@/components/sections/NewsletterSection';
import EditorsPick from '@/components/EditorsPick';
import ContentCard from '@/components/cards/ContentCard';
import { Button } from '@/components/ui/button';
import { getAllContent } from '@/lib/data';

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 20;
  const width = window.innerWidth;
  if (width >= 1280) return 20; // desktop
  if (width >= 1024) return 10; // laptop
  return 5; // mobile
};

const Index = () => {
  const allContent = useMemo(() => getAllContent(), []);
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

  const totalPages = Math.max(1, Math.ceil(allContent.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContent = allContent.slice(startIndex, startIndex + itemsPerPage);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <HeroSection />
        <section aria-labelledby="editors-pick-heading">
          <EditorsPick />
        </section>
        <section aria-labelledby="trending-heading">
          <TrendingMasonry />
        </section>

        <section className="container-blog py-16" aria-labelledby="home-articles-heading">
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              id="home-articles-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title mb-0"
            >
              Latest Articles
            </motion.h2>
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedContent.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <ContentCard item={item} />
              </motion.div>
            ))}
          </div>

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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
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
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
