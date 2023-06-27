import React from "react";
import { styled } from "@linaria/react";
import TodoItem from "../TodoItem/TodoItem";
import { TodoItemProps } from "../../store/todos";
import { TodosArray } from "../MainScreen/MainScreen";
import { sortList } from "../../utils";
import { observer } from "mobx-react-lite";

interface TodoListProps {
  list: TodosArray;
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

const TodosList = observer(({ list }: TodoListProps) => {
  const sortedList = sortList(list, "id");
  return (
    <StyledTodosList>
      {sortedList &&
        sortedList.map((item: TodoItemProps) => (
          <TodoItem key={item.id} item={item} />
        ))}
    </StyledTodosList>
  );
});

export default TodosList;
