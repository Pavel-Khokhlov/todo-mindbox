import React, { useEffect } from 'react';
import { styled } from '@linaria/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState, TodoProps, todosToDisplayState } from '../../store/todos';
import TodoItem from '../TodoItem/TodoItem';

const StyledTodosList = styled.ul`
  width: 100%;
  overflow: auto;
  list-style: none;
  min-height: min(320px, 50vw);
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
  }, [setTodosToDisplay, todoList]);

  return (
    <StyledTodosList>
      {todosToDisplay && todosToDisplay.map((item: TodoProps) => <TodoItem key={item.id} item={item} />)}
    </StyledTodosList>
  );
}

export default TodosList;
