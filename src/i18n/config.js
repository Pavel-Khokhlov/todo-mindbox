import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from '../locales/en-US.json';
import ru from '../locales/ru-RU.json';

const resources = {
  en: {translation: en},
  ru: {translation: ru},
};

export const languages = Object.keys(resources);

const fallbackLanguage = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: global.Intl?.PluralRules ? null : 'v3',
    react: {
      useSuspense: false,
    },
  });

export default i18n;
