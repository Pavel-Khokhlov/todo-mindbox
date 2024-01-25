import React, { MouseEvent, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import BaseText from "../BaseText/BaseText";
import MainButton from "../MainButton/MainButton";

interface ControlProps {
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

const Control = observer(({ onFilter }: ControlProps) => {
  const { todosStore } = useStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState("all");
  const countActiveTodos = todosStore.getActiveTodos().length;
  const countCompletedTodos = todosStore.getCompletedTodos().length;

  const handleDeleteCompleted = () => {
    todosStore.setDeleteCompleted();
  }

  const countTodosToComplete =
    countActiveTodos === 0
      ? `no items`
      : countActiveTodos === 1
      ? `1 item left`
      : `${countActiveTodos} items left`;

  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => {
    const currentButton = event.currentTarget;
    setIsTouched(currentButton.id);
    onFilter(currentButton.id);
  };

  useEffect(() => {
    countCompletedTodos !== 0
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  }, [countCompletedTodos]);

  function capitalize(s: string): string {
    return s.toLowerCase().replace(/\b./g, function (a) {
      return a.toUpperCase();
    });
  }

  function defineDisabled(s: string): boolean {
    return s === "all" && todosStore.todosList.length === 0
      ? true
      : s === "active" && countActiveTodos === 0
      ? true
      : s === "completed" && countCompletedTodos === 0
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
              id={i.name}
              type="button"
              className={isActiveClassName(i.name)}
              disabled={defineDisabled(i.name)}
              onButtonClick={handleFilterClick}
            >
              <BaseText level={"p"} className="button">
                {capitalize(i.name)}
              </BaseText>
            </MainButton>
          );
        })}
      </StyledButtonBlock>
      <MainButton
        type="button"
        disabled={isButtonDisabled}
        onButtonClick={handleDeleteCompleted}
      >
        <BaseText level={"p"} className="button">
          Clear completed
        </BaseText>
      </MainButton>
    </StyledControlBlock>
  );
});

export default Control;
