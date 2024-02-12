import {makeAutoObservable} from 'mobx';
import {RootStore} from './index';
import { THEME, TODO_THEME, ThemeName, ThemeProps, themes } from '../styles/themes';
import { TODO_LOCALE } from '../constants';
import { LOCALES } from '../context/TranslationContext';

export type LocaleProps = LOCALES.ENGLISH | LOCALES.RUSSIAN;

export const HTML = document.querySelector("html");
export const ROOT = document.querySelector("#root");

export class GlobalUIStore {
  rootStore: RootStore;

  theme: ThemeProps = this.initialTheme();
  locale: LocaleProps = this.initialLocale();
  isNotificationShown: boolean = false;
  isEditModalShown: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {rootStore: false});
    this.rootStore = rootStore;
  }

  initialTheme() {
    const value = localStorage.getItem(TODO_THEME);
    if (!value) {
      localStorage.setItem(TODO_THEME, THEME.LIGHTTHEME);
      ROOT?.setAttribute('data-theme', THEME.LIGHTTHEME)
      return themes[THEME.LIGHTTHEME];
    } else {
      const newValue = value === THEME.LIGHTTHEME ? THEME.LIGHTTHEME : THEME.DARKTHEME
      ROOT?.setAttribute('data-theme', newValue)
      return themes[newValue];
    }
  }

  initialLocale() {
    const value = localStorage.getItem(TODO_LOCALE);
    if (!value) {
      let systemLang = window.navigator.language === LOCALES.RUSSIAN ? LOCALES.RUSSIAN : LOCALES.ENGLISH;
      localStorage.setItem(TODO_LOCALE, systemLang);
      return this.locale = systemLang;
    } else {
      const newValue = value === LOCALES.ENGLISH ? LOCALES.ENGLISH : LOCALES.RUSSIAN;
      HTML?.setAttribute('lang', newValue)
      return this.locale = newValue;
    }
  }

  setTheme(value: ThemeName) {
    ROOT?.setAttribute("data-theme", value);
    localStorage.setItem(TODO_THEME, value);
    this.theme = themes[value];
  }

  setLocale(value: LocaleProps) {
    HTML?.setAttribute('lang', value)
    localStorage.setItem(TODO_LOCALE, value);
    this.locale = value;
  }

  setIsEditModalShown(value: boolean) {
    this.isEditModalShown = value;
  }

  setIsNotificationShown(value: boolean) {
    this.isNotificationShown = value;
  }
}
