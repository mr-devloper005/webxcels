import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllContent } from '@/lib/data';
import ContentCard from '@/components/cards/ContentCard';

const ITEMS_PER_PAGE = 9;

const Business = () => {
  const businessContent = useMemo(
    () => getAllContent().filter((item) => item.category === 'BUSINESS'),
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(businessContent.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedContent = businessContent.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Business</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights and opportunities for builders, founders, and modern teams.
          </p>
        </div>

        {paginatedContent.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center flex-wrap gap-2 mt-10">
                <button
                  type="button"
                  className="px-3 py-1 text-sm rounded border border-border disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={!canPrev}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`px-3 py-1 text-sm rounded border ${
                      page === currentPage
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-foreground'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className="px-3 py-1 text-sm rounded border border-border disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={!canNext}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-foreground mb-2">No business content yet</h2>
            <p className="text-muted-foreground">Check back soon for new business articles.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Business;
