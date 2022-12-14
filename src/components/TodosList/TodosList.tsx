import React, { useEffect } from 'react';
import { styled } from '@linaria/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState, TodoProps, todosToDisplayState } from '../../store/todos';
import TodoItem from '../TodoItem/TodoItem';

const STodosList = styled.ul`
  width: 100%;
  height: 320px;
  overflow: scroll;
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

function TodosList() {
  const todoList = useRecoilValue(todoListState);
  const todosToDisplay = useRecoilValue(todosToDisplayState);
  const setTodosToDisplay = useSetRecoilState(todosToDisplayState);

  useEffect(() => {
    setTodosToDisplay(todoList);
  }, [todoList]);

  return (
    <STodosList>
      {todosToDisplay && todosToDisplay.map((item: TodoProps) => <TodoItem key={item.id} item={item} />)}
    </STodosList>
  );
}

export default TodosList;
