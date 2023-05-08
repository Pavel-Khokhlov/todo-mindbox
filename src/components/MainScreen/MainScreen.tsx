import React from 'react';
import { styled } from '@linaria/react';
import FormTodo from '../FormTodo/FormTodo';
import TodosList from '../TodosList/TodosList';
import Control from '../Control/Control';
import Delimiter from '../Delimiter/Delimiter';

const StyledMain = styled.main`
  position: relative;
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

export default function Main() {
  return (
    <StyledMain>
      <StyledMainTodos>
        <FormTodo />
        <Delimiter />
        <TodosList />
        <Control />
      </StyledMainTodos>
      <StyledSpanBlockOne />
      <StyledSpanBlockTwo />
    </StyledMain>
  );
}
