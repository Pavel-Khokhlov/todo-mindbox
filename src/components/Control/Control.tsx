import React, { MouseEvent, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import BaseText from "../BaseText/BaseText";
import MainButton from "../MainButton/MainButton";
import { KEY_TODOS } from "../../utils";
import { TodoItemProps, TodosArray } from "../MainScreen/MainScreen";

interface ControlProps {
  list: TodosArray;
  onDelete: () => void;
  onFilter: (value: string) => void;
}

const StyledControlBlock = styled.section`
  width: 100%;
  height: min(50px, 10vw);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
`;

const StyledButtonBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const controls = [
  { id: 1, name: "all" },
  { id: 2, name: "active" },
  { id: 3, name: "completed" },
];

const Control = ({ list, onDelete, onFilter }: ControlProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState("all");
  const activeTodos = list.filter(
    (item: TodoItemProps) => item.isCompleted === false
  );
  const completedTodos = list.filter(
    (item: TodoItemProps) => item.isCompleted === true
  );

  const countTodosToComplete =
    activeTodos?.length === 0
      ? `no items`
      : activeTodos.length === 1
      ? `1 item left`
      : `${activeTodos.length} items left`;

  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => {
    const currentButton = event.currentTarget;
    setIsTouched(currentButton.id);
    onFilter(currentButton.id);
  };

  useEffect(() => {
    completedTodos.length !== 0
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  }, [completedTodos]);

  useEffect(() => {
    if (list.length !== 0) {
      localStorage.setItem(KEY_TODOS, JSON.stringify(list));
    }
  }, [list]);

  function capitalize(s: string): string {
    return s.toLowerCase().replace(/\b./g, function (a) {
      return a.toUpperCase();
    });
  }

  function defineDisabled(s: string): boolean {
    return s === "all" && list.length === 0
      ? true
      : s === "active" && activeTodos.length === 0
      ? true
      : s === "completed" && completedTodos.length === 0
      ? true
      : false;
  }

  const isActiveClassName = (button: string): string => {
    return button === isTouched && !defineDisabled(button) ? "active" : "";
  };

  return (
    <StyledControlBlock>
      <BaseText level={"p"}>{countTodosToComplete}</BaseText>
      <StyledButtonBlock>
        {controls.map((i) => {
          return (
            <MainButton
              key={i.id}
              onButtonClick={handleFilterClick}
              type="button"
              id={i.name}
              disabled={defineDisabled(i.name)}
              className={isActiveClassName(i.name)}
            >
              <BaseText level={"p"} className="button">
                {capitalize(i.name)}
              </BaseText>
            </MainButton>
          );
        })}
      </StyledButtonBlock>
      <MainButton
        onButtonClick={onDelete}
        type="button"
        disabled={isButtonDisabled}
      >
        <BaseText level={"p"} className="button">
          Clear completed
        </BaseText>
      </MainButton>
    </StyledControlBlock>
  );
};

export default Control;
