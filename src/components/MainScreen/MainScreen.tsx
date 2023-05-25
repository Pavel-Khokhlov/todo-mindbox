import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import FormTodo from "../FormTodo/FormTodo";
import TodosList from "../TodosList/TodosList";
import Control from "../Control/Control";
import Delimiter from "../Delimiter/Delimiter";
import { KEY_TODOS } from "../../utils";

export interface MainProps {
  onEditClick: (item: TodoItemProps) => void;
}

export interface TodoItemProps {
  id: number;
  name: string;
  isCompleted: boolean;
}

export type TodosArray = TodoItemProps[] | [];

const StyledMain = styled.main`
  margin: 0 auto 20px;
  width: min(600px, 90vw);
  box-sizing: border-box;
  z-index: 1;
  flex: 1 1 auto;
`;

const StyledMainTodos = styled.section`
  position: relative;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const StyledSpanBlockOne = styled.span`
  margin: 0 auto;
  display: block;
  position: relative;
  width: 98%;
  height: 5px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;
const StyledSpanBlockTwo = styled.span`
  margin: 0 auto;
  display: block;
  position: relative;
  width: 96%;
  height: 5px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export default function Main({onEditClick}: MainProps) {
  const [allTodos, setAllTodos] = useState<TodosArray>(
    JSON.parse(localStorage.getItem(KEY_TODOS) || "[]")
  );
  const [todosToDisplay, setTodosToDisplay] = useState<TodosArray>([]);
  const activeTodos = allTodos.filter(
    (item: TodoItemProps) => item.isCompleted === false
  );
  const completedTodos = allTodos.filter(
    (item: TodoItemProps) => item.isCompleted === true
  );

  useEffect(() => {
    setTodosToDisplay(allTodos);
  }, [setTodosToDisplay, allTodos]);

  useEffect(() => {
    if (allTodos.length !== 0) {
      localStorage.setItem(KEY_TODOS, JSON.stringify(allTodos));
    } else {
      localStorage.removeItem(KEY_TODOS);
    }
  }, [allTodos]);

  const handleTodoClick = (id: number) => {
    const newList = allTodos.map((item: TodoItemProps) => {
      return item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item;
    });
    setAllTodos(newList);
  };

  const handleAddTodo = useCallback((todo: string) => {
    try {
      setAllTodos((todos: TodosArray) => [
        ...todos,
        {
          id: new Date()[Symbol.toPrimitive]("number"),
          name: todo,
          isCompleted: false,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDeleteCompleted = useCallback(() => {
    const completedTodos = allTodos.filter(
      (item: TodoItemProps) => item.isCompleted !== true
    );
    setAllTodos(completedTodos);
  }, [allTodos]);

  const handleFilter = (value: string) => {
    if (value === "all") {
      setTodosToDisplay(allTodos);
    } else if (value === "active") {
      setTodosToDisplay(activeTodos);
    } else {
      setTodosToDisplay(completedTodos);
    }
  };

  useEffect(() => {
    if (completedTodos.length !== 0) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          handleDeleteCompleted();
        }
      });
    } else {
      document.removeEventListener("keydown", (e) => {});
    }
  }, [completedTodos, handleDeleteCompleted]);

  return (
    <StyledMain>
      <StyledMainTodos>
        <FormTodo onSubmit={handleAddTodo} />
        <Delimiter />
        <TodosList list={todosToDisplay} onChange={handleTodoClick} onEditClick={onEditClick} />
        <Control
          list={allTodos}
          onDelete={handleDeleteCompleted}
          onFilter={handleFilter}
        />
      </StyledMainTodos>
      <StyledSpanBlockOne />
      <StyledSpanBlockTwo />
    </StyledMain>
  );
}
