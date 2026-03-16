import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '@/store/auth-store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, openAuthModal, logout } = useAuthStore();

  const navItems = [
    { name: 'EXPLORE', href: '/posts' },
    { name: 'WRITE', href: '/write' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container-blog">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold gradient-text">WebXcels</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <div className="hidden lg:flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9"
                aria-label="Search"
                onClick={() => navigate('/search')}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  <Button variant="ghost" size="icon" className="h-9 w-9" asChild aria-label="Profile">
                    <Link to="/profile">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={logout} aria-label="Log out">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => openAuthModal('login')}>Log In</Button>
                  <Button size="sm" onClick={() => openAuthModal('signup')}>Sign Up</Button>
                </>
              )}
            </div>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col space-y-3" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <Link to="/profile" className="text-sm text-primary" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => { logout(); setIsMenuOpen(false); }}>Log Out</Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => { openAuthModal('login'); setIsMenuOpen(false); }}>Log In</Button>
                  <Button size="sm" className="flex-1" onClick={() => { openAuthModal('signup'); setIsMenuOpen(false); }}>Sign Up</Button>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search"
                  onClick={() => { navigate('/search'); setIsMenuOpen(false); }}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

