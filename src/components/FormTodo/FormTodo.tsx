import React, { FormEvent, useState } from 'react';
import { styled } from '@linaria/react';
import FieldInput from '../FieldInput/FieldInput';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../../store/todos';

const SForm = styled.form`
  width: 100%;
`;

export default function FormTodo() {
  const setTodoList = useSetRecoilState(todoListState);
  const [value, setValue] = useState<string>('');
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const inputResult = e.currentTarget.value.trim();
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
    setTodoList((list) => [
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
    <SForm onSubmit={handleSubmit}>
      <FieldInput
        value={value}
        onChange={handleChange}
        placeholder="What needs to be done?"
      />
    </SForm>
  );
}
