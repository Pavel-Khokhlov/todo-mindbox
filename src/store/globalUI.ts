import {makeAutoObservable} from 'mobx';
import {RootStore} from './index';

export class GlobalUIStore {
  rootStore: RootStore;

  isEditModalShown: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {rootStore: false});
    this.rootStore = rootStore;
  }

  setEditModalShown(value: boolean) {
    this.isEditModalShown = value;
  }
}
