import React, { MouseEvent, useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState, todosToDisplayState } from '../../store/todos';
import BaseText from '../BaseText/BaseText';
import MainButton from '../MainButton/MainButton';

const SControlBlock = styled.section`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
`;

const SButtonBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const controls = [
  {id: 1, name: 'all'},
  {id: 2, name: 'active'},
  {id: 3, name: 'completed'},
]

export default function Control() {
  const todoList = useRecoilValue(todoListState);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState('all');
  const setTodoList = useSetRecoilState(todoListState);
  const setTodosToDisplay = useSetRecoilState(todosToDisplayState);
  const activeTodos = todoList.filter((item) => item.isCompleted === false);
  const completedTodos = todoList.filter((item) => item.isCompleted === true);

  const countTodosToComplete =
    activeTodos?.length === 0
      ? `no items`
      : activeTodos.length === 1
      ? `1 item left`
      : `${activeTodos.length} items left`;

    const handleClick = () => {
      setTodoList(activeTodos);
    };

    const handleControlClick = (event: MouseEvent<HTMLButtonElement>) => {
      const currentButton = event.currentTarget.id;
      setIsTouched(currentButton);
      if (currentButton === 'all') {
        setTodosToDisplay(todoList);
      } else if (currentButton === 'active') {
        setTodosToDisplay(activeTodos);
      } else {
        setTodosToDisplay(completedTodos);
      }
    }

    useEffect(() => {
      completedTodos.length !== 0 ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }, [completedTodos])
 
    function capitalize(s: string): string{
      return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
    };

    function defineDisabled(s: string): boolean{
      return s === 'all' && todoList.length === 0 ? true : s === 'active' && activeTodos.length === 0 ? true : s === 'completed' && completedTodos.length === 0 ? true : false;
    };

    const isActiveClassName = (button: string): string => {
      return button === isTouched && !defineDisabled(button) ? 'active' : '';
    } 

  return (
    <SControlBlock>
      <BaseText level={'p'}>{countTodosToComplete}</BaseText>
      <SButtonBlock>
        {controls.map((i) => {
          return (
            <MainButton key={i.id} onButtonClick={handleControlClick} type="button" id={i.name} disabled={defineDisabled(i.name)} className={isActiveClassName(i.name)}>
                <BaseText level={'p'} className="button">{capitalize(i.name)}</BaseText>
            </MainButton>
        )})}
      </SButtonBlock>
      <MainButton onButtonClick={handleClick} type="button" disabled={isButtonDisabled}>
        <BaseText level={'p'} className="button">Clear completed</BaseText>
      </MainButton>
    </SControlBlock>
  );
}
