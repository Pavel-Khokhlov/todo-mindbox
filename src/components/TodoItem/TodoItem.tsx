import React from 'react';
import { styled } from '@linaria/react';
import { TodoProps } from '../../store/todos';
import Icon from '../../assets/icons/checkbox.svg';
import SVG from 'react-inlinesvg';
import { SVGProps } from '../FieldInput/FieldInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState } from '../../store/todos';
import Delimiter from '../Delimiter/Delimiter';

interface TodoItemProps {
  item: TodoProps;
  key?: number;
}

const StyledTodoItem = styled.div`
  width: 100%;
  height: min(80px, 12.5vw);
  display: flex;
  align-items: center;
  border: none;
  box-sizing: border-box;
`;

const StyledCheckBox = styled.div`
  width: min(40px, 6.25vw);
  height: min(40px, 6.25vw);
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
  width: min(25px, 5vw);
  height: min(25px, 5vw);
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  font-size: min(25px, 5vw);
  color: black;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: start;
  &.completed {
    color: lightgrey;
    text-decoration: line-through;
  }
`;

const TodoItem = ({ item }: TodoItemProps) => {
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(todoListState);
  const { id, name, isCompleted } = item;
  const handleClick = () => {
    const newList = todoList.map((item: TodoProps) => {
      return item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item;
    });
    setTodoList(newList);
  };

  const labelClassName = isCompleted ? 'completed' : '';

  return (
    <><StyledTodoItem onClick={handleClick}>
      <StyledCheckBox>
        {isCompleted && <StyledIcon src={Icon} color={'rgba(52, 201, 36, 1)'} />}
      </StyledCheckBox>
      <StyledInput type="checkbox" checked={isCompleted} readOnly />
      <StyledLabel className={labelClassName}>{name}</StyledLabel>
    </StyledTodoItem><Delimiter /></>
  );
};

export default TodoItem;
