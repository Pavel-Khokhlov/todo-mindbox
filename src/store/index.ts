import {createContext, useContext} from 'react';
import {GlobalUIStore} from './globalUI';
import {TodosStore} from './todos';

export class RootStore {
  globalUIStore: GlobalUIStore;
  todosStore: TodosStore;

  constructor() {
    this.globalUIStore = new GlobalUIStore(this);
    this.todosStore = new TodosStore(this);
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);
export const useStore = () => useContext(RootStoreContext);
