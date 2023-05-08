import React, { FormEvent, useState } from 'react';
import { styled } from '@linaria/react';
import FieldInput from '../FieldInput/FieldInput';
import { useSetRecoilState } from 'recoil';
import { todoListState, TodoProps } from '../../store/todos';

const StyledForm = styled.form`
  width: 100%;
  text-align: start;
`;

export default function FormTodo() {
  const setTodoList = useSetRecoilState(todoListState);
  const [value, setValue] = useState<string>('');
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const inputResult = e.currentTarget.value.trimStart();
    const updatedResult =
    inputResult.charAt(0).toUpperCase() +
    inputResult.slice(1);
    setValue(updatedResult);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.length === 0) {
      return alert('Please, enter your todo!')
    }
    setTodoList((list: TodoProps[]) => [
      ...list,
      {
        id: new Date()[Symbol.toPrimitive]('number'),
        name: value,
        isCompleted: false,
      },
    ]);
    setValue('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FieldInput
        value={value}
        onChange={handleChange}
        placeholder="What needs to be done?"
      />
    </StyledForm>
  );
}
