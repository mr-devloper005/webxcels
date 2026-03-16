import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const openRoles = [
  {
    title: 'Frontend Engineer',
    type: 'Full-time',
    location: 'Remote',
    description: 'Build polished, high-performance UI experiences for a global publishing platform.',
  },
  {
    title: 'Content Editor',
    type: 'Contract',
    location: 'Remote',
    description: 'Curate and refine articles with a strong editorial voice.',
  },
  {
    title: 'Community Manager',
    type: 'Full-time',
    location: 'Remote',
    description: 'Grow creator relationships and lead community programs across channels.',
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Careers at WebXcels</h1>
            <p className="text-lg text-muted-foreground">
              We are building a home for world-class writing and looking for teammates who care deeply about craft.
            </p>
          </section>

          <section className="grid gap-4">
            {openRoles.map((role) => (
              <article key={role.title} className="rounded-xl border border-border bg-card p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold text-foreground">{role.title}</h2>
                  <span className="text-xs rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                    {role.type} · {role.location}
                  </span>
                </div>
                <p className="text-muted-foreground">{role.description}</p>
                <Button asChild>
                  <a href="mailto:careers@webxcels.com?subject=Application%20for%20WebXcels" aria-label={`Apply for ${role.title}`}>
                    Apply Now
                  </a>
                </Button>
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;



