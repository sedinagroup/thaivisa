import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import thTranslations from './locales/th.json';
import ptTranslations from './locales/pt.json';
import zhTranslations from './locales/zh-CN.json';

const resources = {
  en: { translation: enTranslations },
  th: { translation: thTranslations },
  pt: { translation: ptTranslations },
  'zh-CN': { translation: zhTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;