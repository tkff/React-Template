import type en from './locales/en.json';

// Type-safe translation keys
export type TranslationKeys = typeof en;

// Declare module for react-i18next to get type-safe translations
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationKeys;
    };
  }
}
