import React from 'react';
import { styled } from '@linaria/react';
import { TodoProps } from '../../store/todos';
import Icon from '../../assets/icons/checkbox.svg';
import SVG from 'react-inlinesvg';
import { SVGProps } from '../FieldInput/FieldInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState } from '../../store/todos';
import { css } from '@linaria/core';

interface TodoItemProps {
  item: TodoProps;
}

const STodoItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 10px;
  box-sizing: border-box;
`;

const SCheckBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SIcon = styled(SVG)<SVGProps>`
  width: 25px;
  height: 25px;
`;

const SInput = styled.input`
  display: none;
`;

const SLabel = styled.label`
  font-size: 25px;
  color: black;
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
    const newList = todoList.map((item) => {
      return item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item;
    });
    setTodoList(newList);
  };

  const labelClassName = isCompleted ? 'completed' : '';

  return (
    <STodoItem onClick={handleClick}>
      <SCheckBox>
        {isCompleted && <SIcon src={Icon} color={'rgba(52, 201, 36, 1)'} />}
      </SCheckBox>
      <SInput type="checkbox" checked={isCompleted} readOnly />
      <SLabel className={labelClassName}>{name}</SLabel>
    </STodoItem>
  );
};

export default TodoItem;
