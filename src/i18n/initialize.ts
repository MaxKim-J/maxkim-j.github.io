import { resources } from './resources';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { type Lang } from '../types';

export const initialize = (lang: Lang) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    interpolation: {
      escapeValue: false,
    },
  });
  return lang;
};
