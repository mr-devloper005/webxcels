import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCarouselContent } from '@/lib/data';

const HeroCarousel = () => {
  const carouselContent = getCarouselContent();

  return (
    <section className="relative">
      <div className="grid md:grid-cols-3 gap-6">
        {carouselContent.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <Link
              to={`/blog/${item.slug}`}
              className="group block rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                    Article
                  </span>
                  <h3 className="text-white font-semibold mt-2 line-clamp-2">{item.title}</h3>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
