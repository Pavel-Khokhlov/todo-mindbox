import {makeAutoObservable} from 'mobx';
import {RootStore} from './index';
import { TODO_THEME, Theme } from '../components/Header/Header';

export class GlobalUIStore {
  rootStore: RootStore;

  isEditModalShown: boolean = false;
  isLightTheme = this.initialTheme();

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
      return true;
    } else {
      root?.setAttribute('data-theme', value === "light" ? Theme.LightTheme : Theme.DarkTheme)
      return value === Theme.LightTheme ? true : false;
    }
  }

  setIsLightTheme(value: boolean) {
    this.isLightTheme = value;
  }

  setEditModalShown(value: boolean) {
    this.isEditModalShown = value;
  }
}
