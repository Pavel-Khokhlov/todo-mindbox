import {makeAutoObservable} from 'mobx';
import {RootStore} from './index';
import { TODO_THEME, Theme, ThemeName, ThemeProps, themes } from '../styles/themes';

export class GlobalUIStore {
  rootStore: RootStore;

  isEditModalShown: boolean = false;
  theme: ThemeProps = this.initialTheme();

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {rootStore: false});
    this.rootStore = rootStore;
  }

  initialTheme() {
    const root = document.querySelector("#root");
    const value = localStorage.getItem(TODO_THEME);
    if (!value) {
      localStorage.setItem(TODO_THEME, Theme.LightTheme);
      root?.setAttribute('data-theme', Theme.LightTheme)
      return themes[Theme.LightTheme];
    } else {
      root?.setAttribute('data-theme', value === "light" ? Theme.LightTheme : Theme.DarkTheme)
      return themes[value === Theme.LightTheme ? Theme.LightTheme : Theme.DarkTheme];
    }
  }

  setTheme(value: ThemeName) {
    this.theme = themes[value];
  }

  setEditModalShown(value: boolean) {
    this.isEditModalShown = value;
  }
}
