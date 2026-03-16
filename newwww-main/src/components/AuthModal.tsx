import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

const AuthModal = () => {
  const { isAuthModalOpen, authModalTab, closeAuthModal, setAuthModalTab, login } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (authModalTab === 'signup' && !name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    // Mock auth: create a local user profile for UI-only auth state
    login({
      id: crypto.randomUUID(),
      name: authModalTab === 'signup' ? name.trim() : email.split('@')[0],
      email: email.trim().toLowerCase(),
    });

    toast.success(authModalTab === 'signup' ? 'Account created!' : 'Welcome back!');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog
      open={isAuthModalOpen}
      onOpenChange={(open) => {
        if (!open) closeAuthModal();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {authModalTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex rounded-lg bg-muted p-1 mb-6">
          <button
            type="button"
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              authModalTab === 'login'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setAuthModalTab('signup')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              authModalTab === 'signup'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalTab === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="auth-name">Full Name</Label>
              <Input
                id="auth-name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            {authModalTab === 'login' ? 'Log In' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {authModalTab === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModalTab('signup')}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModalTab('login')}
                className="text-primary hover:underline font-medium"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
