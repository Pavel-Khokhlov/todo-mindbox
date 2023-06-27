import { makeAutoObservable } from "mobx";
import { RootStore } from "./index";
import { KEY_TODOS } from "../utils";

export interface TodoItemProps {
  id: number;
  name: string;
  isCompleted: boolean;
  modified_at?: number;
}

const localTodos = localStorage[`${KEY_TODOS}`]
  ? JSON.parse(localStorage[`${KEY_TODOS}`])
  : [];

export class TodosStore {
  rootStore: RootStore;

  todosList: TodoItemProps[] | [] = localTodos;
  editableTodo: TodoItemProps | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  getActiveTodos() {
    return this.todosList.filter(
      (item: TodoItemProps) => item.isCompleted === false
    );
  }

  getCompletedTodos() {
    return this.todosList.filter(
      (item: TodoItemProps) => item.isCompleted === true
    );
  }

  setTodosList(array: TodoItemProps[]) {
    this.todosList = array || [];
  }

  setAddNewTodo(value: string) {
    this.todosList = [
      ...this.todosList,
      {
        id: new Date()[Symbol.toPrimitive]("number"),
        name: value,
        isCompleted: false,
      },
    ];
  }

  setToggleComplete(id: number) {
    this.todosList = this.todosList.map((item: TodoItemProps) => {
      return item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item;
    });
  }

  setEditableTodo(item: TodoItemProps) {
    this.editableTodo = item;
  }

  setUpdateTodo(value: string) {
    this.todosList = this.todosList.map((item: TodoItemProps) => {
      return item.id === this.editableTodo?.id
        ? {
            ...item,
            name: value,
            modified_at: new Date()[Symbol.toPrimitive]("number"),
          }
        : item;
    });
  }
  setDeleteCompleted() {
    this.todosList = this.getActiveTodos();
  }
}
