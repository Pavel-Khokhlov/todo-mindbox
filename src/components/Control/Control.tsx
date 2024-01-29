import React, { MouseEvent, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import BaseText from "../BaseText/BaseText";
import MainButton from "../MainButton/MainButton";

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

const Control = observer(() => {
  const { todosStore, globalUIStore } = useStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const countActiveTodos = todosStore.activeTodos.length;
  const countCompletedTodos = todosStore.completedTodos.length;

  const handleDeleteCompleted = () => {
    todosStore.setDeleteCompleted();
  };

  const countTodosToComplete =
    countActiveTodos === 0
      ? `no items`
      : countActiveTodos === 1
      ? `1 item left`
      : `${countActiveTodos} items left`;

  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => {
    const currentButton = event.currentTarget;
    todosStore.setFilterValue(currentButton.id);
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

  const activeButton = todosStore.filterValue;

  return (
    <StyledControlBlock>
      <BaseText level={"p"} style={{ color: globalUIStore.theme.textColor }}>
        {countTodosToComplete}
      </BaseText>
      <StyledButtonBlock>
        {controls.map((i) => {
          return (
            <MainButton
              key={i.id}
              id={i.name}
              type="button"
              // className={isActiveClassName(i.name)}
              disabled={defineDisabled(i.name)}
              onButtonClick={handleFilterClick}
              style={{
                backgroundColor:
                  i.name === activeButton && !defineDisabled(i.name)
                    ? globalUIStore.theme.infoColor
                    : globalUIStore.theme.transparent,
              }}
            >
              <BaseText
                level={"p"}
                className="button"
                style={{
                  color: defineDisabled(i.name)
                    ? globalUIStore.theme.textDisableColor
                    : i.name === activeButton
                    ? globalUIStore.theme.secondaryColor
                    : globalUIStore.theme.textColor,
                }}
              >
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
        <BaseText
          level={"p"}
          className="button"
          style={{
            color: isButtonDisabled
              ? globalUIStore.theme.textDisableColor
              : globalUIStore.theme.textColor,
          }}
        >
          Clear completed
        </BaseText>
      </MainButton>
    </StyledControlBlock>
  );
});

export default Control;
