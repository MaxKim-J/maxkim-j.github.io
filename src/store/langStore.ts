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
  initialize: (lang: Lang) => {
    // TODO: i18n과 결합시키기
  },
  setLang: (lang: Lang) => {
    set(() => ({ lang }));
  },
}));
