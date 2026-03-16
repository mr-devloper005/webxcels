import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    { icon: Users, title: 'Community First', description: 'We build for creators and readers who share a passion for quality writing.' },
    { icon: Target, title: 'Quality Over Quantity', description: 'Every article is curated and reviewed to ensure high standards.' },
    { icon: Heart, title: 'Authentic Voices', description: 'We celebrate diverse perspectives and genuine storytelling.' },
    { icon: Globe, title: 'Global Reach', description: 'Connecting creators with audiences worldwide.' },
  ];

  const team = [
    { name: 'Alex Chen', role: 'Founder & CEO', initial: 'A' },
    { name: 'Sarah Mitchell', role: 'Head of Content', initial: 'S' },
    { name: 'Marcus Lee', role: 'Lead Designer', initial: 'M' },
    { name: 'Priya Sharma', role: 'Community Manager', initial: 'P' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10 dark:from-primary/10 dark:via-background dark:to-accent/5" />
          <div className="relative container-blog py-20 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                About WebXcels
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We are building the home for creators who want to publish thoughtful articles for a global audience.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-blog py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  WebXcels was founded with a simple belief: great writing deserves a great platform.
                  In a world of fleeting attention spans, we are building a space where quality matters.
                </p>
                <p>
                  We connect creators with engaged audiences who appreciate thoughtful articles and practical insights.
                </p>
                <p>
                  Our platform powers many communities through a single, elegantly designed system,
                  giving creators the tools they need while maintaining a premium reading experience.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground mb-2">100+</div>
                <p className="text-muted-foreground">Communities Powered</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="container-blog">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-blog py-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">{member.initial}</span>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container-blog py-16">
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Connect with creators and discover writing that inspires. Start exploring today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/posts">Explore Articles</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

