import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllContent } from '@/lib/data';
import ContentCard from '@/components/cards/ContentCard';

const Technology = () => {
  const technologyContent = getAllContent().filter((item) => item.category === 'TECHNOLOGY');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Technology</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore technology stories, tools, and creative services shaping what comes next.
          </p>
        </div>

        {technologyContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyContent.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-foreground mb-2">No technology content yet</h2>
            <p className="text-muted-foreground">Check back soon for new technology content.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Technology;
