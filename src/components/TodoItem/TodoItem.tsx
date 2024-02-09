import React from "react";
import { styled } from "@linaria/react";
import Icon from "../../assets/icons/checkbox.svg";
import SVG from "react-inlinesvg";
import { SVGProps, StyledButton } from "../FieldInput/FieldInput";
import IconEdit from "../../assets/icons/edit.svg";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { TodoItemProps } from "../../store/todos";

interface TodoProps {
  item: TodoItemProps;
  key?: number;
}

const StyledBlockItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: min(20px, 3vw);
  margin: min(15px, 2vw);
`;

const StyledTodoItem = styled.div`
  width: min(700px, 85%);
  height: min(80px, 12.5vw);
  display: flex;
  align-items: center;
  border: none;
  box-sizing: border-box;
`;

const StyledCheckBox = styled.div`
  width: min(30px, 6.25vw);
  height: min(30px, 6.25vw);
  margin: 0 10px;
  border-radius: 50%;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const StyledIcon = styled(SVG)<SVGProps>`
  width: min(20px, 5vw);
  height: min(20px, 5vw);
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  font-size: min(25px, 5vw);
  font-weight: 400;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  width: min(650px, 87%);
  max-width: min-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: start;
  &.completed {
    color: lightgrey;
    text-decoration: line-through;
  }
`;

const StyledIconEdit = styled(SVG)<SVGProps>`
  padding: 0 10px;
  width: min(30px, 6vw);
  height: min(30px, 6vw);
`;

const TodoItem = observer(({ item }: TodoProps) => {
  const { id, name, isCompleted } = item;
  const { globalUIStore, todosStore } = useStore();
  const { theme } = globalUIStore;

  const handleChange = (id: number) => {
    todosStore.setToggleComplete(id);
  };

  const handelEditClick = () => {
    globalUIStore.setIsEditModalShown(true);
    todosStore.setEditableTodo(item);
  };

  const labelClassName = isCompleted ? "completed" : "";

  return (
    <StyledBlockItem style={{ background: theme.itemBodyColor }}>
      <StyledTodoItem onClick={() => handleChange(id)}>
        <StyledCheckBox style={{ borderColor: theme.disabledColor }}>
          {isCompleted && <StyledIcon src={Icon} color={theme.successColor} />}
        </StyledCheckBox>
        <StyledInput type="checkbox" checked={isCompleted} readOnly />
        <StyledLabel
          className={labelClassName}
          style={{
            color: !isCompleted ? theme.textColor : theme.disabledColor,
          }}
        >
          {name}
        </StyledLabel>
      </StyledTodoItem>
      <StyledButton onClick={() => handelEditClick()} disabled={isCompleted}>
        <StyledIconEdit
          src={IconEdit}
          color={isCompleted ? theme.disabledColor : theme.infoColor}
        />
      </StyledButton>
    </StyledBlockItem>
  );
});

export default TodoItem;
