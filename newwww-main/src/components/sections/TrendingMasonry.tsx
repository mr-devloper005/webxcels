import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTrendingContent } from '@/lib/data';

const TrendingMasonry = () => {
  const trendingContent = getTrendingContent();

  return (
    <section className="container-blog py-16">
      <h2 className="section-title mb-8">Trending Right Now</h2>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {trendingContent.map((item, i) => {
          const heightClass = i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]';
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="break-inside-avoid"
            >
              <Link
                to={`/blog/${item.slug}`}
                className="group block relative rounded-xl overflow-hidden bg-card border border-border"
              >
                <div className={`relative ${heightClass} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                        Article
                      </span>
                      <span className="text-[10px] text-white/70">{item.category}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingMasonry;
