import { atom } from 'recoil';

export interface TodoProps {
  id: number;
  name: string;
  isCompleted: boolean;
}

export const todoListState = atom<TodoProps[]>({
  key: 'todoListState',
  default: [],
});

export const todosToDisplayState = atom<TodoProps[]>({
  key: 'todosToDisplayState',
  default: [],
});
