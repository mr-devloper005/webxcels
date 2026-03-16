import { create } from 'zustand';
import type { ContentType } from '@/lib/data';

interface UIState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeContentFilter: ContentType | 'all';
  setActiveContentFilter: (f: ContentType | 'all') => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  activeContentFilter: 'all',
  setActiveContentFilter: (f) => set({ activeContentFilter: f }),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
