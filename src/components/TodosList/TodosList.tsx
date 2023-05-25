import React from "react";
import { styled } from "@linaria/react";
import TodoItem from "../TodoItem/TodoItem";
import { TodoItemProps, TodosArray } from "../MainScreen/MainScreen";

interface TodoListProps {
  list: TodosArray;
  onChange: (value: number) => void;
  onEditClick: (item: TodoItemProps) => void;
}

const StyledTodosList = styled.ul`
  width: 100%;
  overflow: auto;
  list-style: none;
  min-height: min(324px, 51vw);
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

function TodosList({list, onChange, onEditClick}: TodoListProps) {

  return (
    <StyledTodosList>
      {list &&
        list.map((item: TodoItemProps) => (
          <TodoItem key={item.id} item={item} onChange={onChange} onEditClick={onEditClick} />
        ))}
    </StyledTodosList>
  );
}

export default TodosList;
