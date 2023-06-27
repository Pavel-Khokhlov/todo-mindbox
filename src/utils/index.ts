export const KEY_TODOS: string = "array_todos";

export const sortList = (list: any[], key: string | number) => {
  return list.slice().sort((a, b) => {
    return a[key] > b[key] ? -1 : 1;
  });
};
