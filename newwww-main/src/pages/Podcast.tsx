import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllContent } from '@/lib/data';
import ContentCard from '@/components/cards/ContentCard';

const Podcast = () => {
  const podcastContent = getAllContent().filter((item) => item.category === 'PODCAST');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" className="container-blog py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Podcast</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Listen to conversations with creators, operators, and industry leaders.
          </p>
        </div>

        {podcastContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcastContent.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-foreground mb-2">No podcast episodes yet</h2>
            <p className="text-muted-foreground">We are preparing the first set of episodes.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Podcast;
