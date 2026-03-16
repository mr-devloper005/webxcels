import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="container-blog py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="block">
              <h2 className="text-2xl font-bold gradient-text">WebXcels</h2>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Discover thoughtful articles from creators worldwide. Built for curiosity.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/posts" className="opacity-70 hover:opacity-100 transition-opacity">Articles</Link></li>
              <li><Link to="/write" className="opacity-70 hover:opacity-100 transition-opacity">Write</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="opacity-70 hover:opacity-100 transition-opacity">About</Link></li>
              <li><Link to="/contact" className="opacity-70 hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link to="/careers" className="opacity-70 hover:opacity-100 transition-opacity">Careers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><Link to="/terms" className="opacity-70 hover:opacity-100 transition-opacity">Terms of Service</Link></li>
              <li><Link to="/sitemap" className="opacity-70 hover:opacity-100 transition-opacity">Sitemap</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50">Connect</h3>
            <div className="flex items-center gap-4">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="opacity-70 hover:opacity-100 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="opacity-70 hover:opacity-100 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="opacity-70 hover:opacity-100 transition-opacity">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-50">
            © {new Date().getFullYear()} WebXcels. All rights reserved.
          </p>
          <p className="text-sm opacity-50">
            Made with care for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

