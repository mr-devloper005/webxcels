import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({ title: 'Subscribed!', description: 'Thank you for joining our newsletter.' });
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 dark:from-primary/20 dark:via-accent/10 dark:to-primary/10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative container-blog py-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Stay in the loop</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Get the best articles delivered straight to your inbox. No spam, ever.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-full py-5 px-5 bg-card border border-border"
            aria-label="Email address"
          />
          <Button type="submit" className="rounded-full px-6 py-5">
            <Send className="h-4 w-4 mr-2" />
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
