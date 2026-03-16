import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SocialShare from '@/components/SocialShare';
import ReadingProgress from '@/components/ReadingProgress';
import BackToTop from '@/components/BackToTop';
import ContentCard from '@/components/cards/ContentCard';
import { deleteUserArticle, getBySlug, getRelated, getArticles } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import CommentSection from '@/components/CommentSection';
import ReviewSection from '@/components/ReviewSection';
import { useAuthStore } from '@/store/auth-store';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, openAuthModal } = useAuthStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const article = getBySlug(slug || '');

  // Fallback for old slugs or not found
  if (!article || article.type !== 'article') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-blog py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/posts" className="text-primary hover:underline">Browse all content</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = !!(user && article.authorId && article.authorId === user.id);
  const related = getRelated(article, 3);
  const popularArticles = getArticles().slice(0, 3);
  const handleNewsletterSubscribe = () => {
    if (!newsletterEmail.trim()) {
      toast({ title: 'Email required', description: 'Please enter your email address.' });
      return;
    }
    toast({ title: 'Subscribed!', description: 'You will receive new articles in your inbox.' });
    setNewsletterEmail('');
  };

  const handleDeleteArticle = () => {
    if (!user) {
      openAuthModal('login');
      toast({ title: 'Sign in required', description: 'Please sign in to manage your articles.' });
      return;
    }

    if (!isOwner) {
      toast({ title: 'Not allowed', description: 'You can only delete your own articles.' });
      return;
    }

    deleteUserArticle(article.id);
    toast({ title: 'Article deleted', description: 'Your article has been removed.' });
    navigate('/posts');
  };

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      
      <main id="main-content" className="container-blog py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">Article</span>
                <span className="text-xs text-muted-foreground">{article.category}</span>
                {article.subcategory && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{article.subcategory}</span>
                  </>
                )}
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight"
              >
                {article.title}
              </motion.h1>
              
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">{article.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{article.author}</p>
                    <p className="text-xs text-muted-foreground">{article.readTime || '5 min read'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isOwner && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/write?edit=${article.slug}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteArticle}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  <SocialShare title={article.title} description={article.excerpt} />
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[16/10] object-cover rounded-xl"
              />
            </motion.div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none text-foreground article-content
                prose-headings:text-foreground prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-muted-foreground prose-li:text-muted-foreground
                prose-img:rounded-xl prose-img:my-6
                prose-strong:text-foreground"
              data-article-content
              dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related Posts */}
            {related.length > 0 && (
              <section className="mt-16 pt-8 border-t border-border">
                <h2 className="section-title mb-6">Related Content</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {related.map((item) => (
                    <ContentCard key={item.id} item={item} compact />
                  ))}
                </div>
              </section>
            )}

            <section className="mt-16 pt-8 border-t border-border">
              <CommentSection contentType="article" slug={article.slug} title={article.title} />
            </section>

            <section className="mt-16 pt-8 border-t border-border">
              <ReviewSection articleSlug={article.slug} />
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Newsletter */}
            <div className="bg-foreground text-background p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-3">Newsletter</h3>
              <p className="text-sm mb-4 opacity-80">
                Get our newest articles delivered to your inbox.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-background text-foreground border-0"
                />
                <Button
                  variant="outline"
                  className="w-full bg-background text-foreground hover:bg-background/90"
                  onClick={handleNewsletterSubscribe}
                >
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Popular */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">Popular Articles</h3>
              <div className="space-y-4">
                {popularArticles.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="flex gap-4 group"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{post.category}</p>
                      <h4 className="text-sm font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {['Fashion', 'Technology', 'Business', 'Lifestyle'].map((category) => (
                  <Link
                    key={category}
                    to={`/posts?type=article`}
                    className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default BlogDetail;
