import { create } from 'zustand';
import { Theme } from '../types';

export const STORAGE_KEY_THEME = 'maxkim-blog-theme';
export const THEME_LIST: Theme[] = ['light', 'dark'];

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem(STORAGE_KEY_THEME) ?? 'light') as Theme,
  setTheme: (theme: Theme) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY_THEME, theme);
      (window as any).__setTheme(theme);
    }

    set(() => ({ theme }));
  },
}));
