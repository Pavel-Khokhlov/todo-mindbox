import React, { MouseEvent, useContext } from "react";
import { styled } from "@linaria/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import BaseText from "../BaseText/BaseText";
import MainButton from "../MainButton/MainButton";

import { TranslationContext } from "../../context/TranslationContext";
import { FILTER } from "../../store/todos";

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
  { id: 1, name: FILTER.ALL },
  { id: 2, name: FILTER.ACTIVE },
  { id: 3, name: FILTER.COMPLETED },
];

const Control = observer(() => {
  const { todosStore, globalUIStore } = useStore();
  const { theme } = globalUIStore;
  const t = useContext(TranslationContext);
  const countActiveTodos = todosStore.activeTodos.length;
  const countCompletedTodos = todosStore.completedTodos.length;

  const countTodosToComplete = `${todosStore.activeTodos.length} / ${todosStore.todosList.length}`;

  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    todosStore.setFilterValue(FILTER[id.toUpperCase() as keyof typeof FILTER]);
  };

  function defineDisabled(s: string): boolean {
    return s === FILTER.ALL && todosStore.todosList.length === 0
      ? true
      : s === FILTER.ACTIVE && countActiveTodos === 0
      ? true
      : s === FILTER.COMPLETED && countCompletedTodos === 0
      ? true
      : false;
  }

  const activeButton = todosStore.filterValue;

  return (
    <StyledControlBlock>
      <BaseText level={"p"} style={{ color: theme.textColor }}>
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
                    ? theme.infoColor
                    : theme.transparent,
              }}
            >
              <BaseText
                level={"p"}
                className="button"
                style={{
                  color: defineDisabled(i.name)
                    ? theme.textDisableColor
                    : i.name === activeButton
                    ? theme.secondaryColor
                    : theme.textColor,
                }}
              >
                {t[`controls_${i.name}` as keyof typeof t]}
              </BaseText>
            </MainButton>
          );
        })}
      </StyledButtonBlock>
    </StyledControlBlock>
  );
});

export default Control;
