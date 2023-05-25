import React from "react";
import { styled } from "@linaria/react";
import Icon from "../../assets/icons/checkbox.svg";
import SVG from "react-inlinesvg";
import { SVGProps, StyledButton } from "../FieldInput/FieldInput";
// import Delimiter from "../Delimiter/Delimiter";
import { TodoItemProps } from "../MainScreen/MainScreen";
import IconEdit from '../../assets/icons/edit.svg';

interface TodoProps {
  item: TodoItemProps;
  key?: number;
  onChange: (value: number) => void;
  onEditClick: (item: TodoItemProps) => void;
}

const StyledBlockItem = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const StyledTodoItem = styled.div`
  width: min(700px,85%);
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
  border: 1px solid rgba(0, 0, 0, 0.2);
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
  color: black;
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

const TodoItem = ({ item, onChange, onEditClick }: TodoProps) => {
  const { id, name, isCompleted } = item;

  const labelClassName = isCompleted ? "completed" : "";

  /* const handleEditClick = (id: number) => {
    console.log(`EDIT`, id);
  }; */

  return (
    <StyledBlockItem>
      <StyledTodoItem onClick={() => onChange(id)}>
        <StyledCheckBox>
          {isCompleted && (
            <StyledIcon src={Icon} color={"rgba(52, 201, 36, 1)"} />
          )}
        </StyledCheckBox>
        <StyledInput type="checkbox" checked={isCompleted} readOnly />
        <StyledLabel className={labelClassName}>{name}</StyledLabel>
      </StyledTodoItem>
      <StyledButton onClick={() => onEditClick(item)} disabled={isCompleted}>
        <StyledIconEdit src={IconEdit} color={isCompleted ? 'lightgrey' : 'rgba(0, 0, 200, 0.5)'}  />
      </StyledButton>
    </StyledBlockItem>
  );
};

export default TodoItem;
