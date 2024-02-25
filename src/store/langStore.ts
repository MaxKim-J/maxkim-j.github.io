import { create } from 'zustand';
import { Lang } from '../types';

export const LANG_LIST: Lang[] = ['ko', 'en'];
export const DEFAULT_LANG: Lang = 'ko';

interface LangStore {
  lang: Lang;
  setLang: (theme: Lang) => void;
}

export const useLangStore = create<LangStore>((set) => ({
  lang: DEFAULT_LANG,
  setLang: (lang: Lang) => {
    set(() => ({ lang }));
  },
}));
