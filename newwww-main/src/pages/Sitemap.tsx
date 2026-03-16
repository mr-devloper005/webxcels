import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { getAllContent } from '@/lib/data';

const Sitemap = () => {
  const staticPages = [
    { label: 'Home', path: '/' },
    { label: 'All Posts', path: '/posts' },
    { label: 'Business', path: '/business' },
    { label: 'Technology', path: '/technology' },
    { label: 'Podcast', path: '/podcast' },
    { label: 'Write', path: '/write' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/careers' },
    { label: 'Search', path: '/search' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
  ];

  const allContent = getAllContent();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Sitemap</h1>
            <p className="text-muted-foreground">Browse all pages and published articles.</p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Core Pages</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {staticPages.map((page) => (
                <Link key={page.path} to={page.path} className="rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-primary/40 transition-colors">
                  {page.label}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Articles</h2>
            <div className="space-y-2">
              {allContent.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-primary/40 transition-colors"
                >
                  <span className="text-xs rounded-full bg-muted px-2 py-0.5 uppercase tracking-wide">article</span>
                  <span className="font-medium text-foreground">{item.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;
