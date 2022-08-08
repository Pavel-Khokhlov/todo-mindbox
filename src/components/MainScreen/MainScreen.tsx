import React from 'react';
import { styled } from '@linaria/react';
import FormTodo from '../FormTodo/FormTodo';
import TodosList from '../TodosList/TodosList';
import Control from '../Control/Control';

const SMain = styled.main`
  position: relative;
  margin: 0 auto;
  width: min(600px, 90vw);
  box-sizing: border-box;
  z-index: 1;
`;

const SMainTodos = styled.section`
  position: relative;
  top: 0;
  width: 100%;
  height: 480px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const SSpanBlockOne = styled.span`
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 100%;
  width: 98%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;
const SSpanBlockTwo = styled.span`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 100%;
  width: 96%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export default function Main() {
  return (
    <SMain>
      <SMainTodos>
        <FormTodo />
        <TodosList />
        <Control />
      </SMainTodos>
      <SSpanBlockOne />
      <SSpanBlockTwo />
    </SMain>
  );
}
