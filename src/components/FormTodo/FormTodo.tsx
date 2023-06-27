import React, { FormEvent, useState } from "react";
import { styled } from "@linaria/react";
import FieldInput from "../FieldInput/FieldInput";
import { useStore } from "../../store";

const StyledForm = styled.form`
  width: 100%;
  text-align: start;
`;

const FormTodo = () => {
  const { todosStore } = useStore();
  const [value, setValue] = useState<string>("");
  const handleChangeValue = (e: FormEvent<HTMLInputElement>) => {
    const inputResult = e.currentTarget.value.trimStart();
    const updatedResult =
      inputResult.charAt(0).toUpperCase() + inputResult.slice(1);
    setValue(updatedResult);
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value.length === 0) {
      return alert("Please, enter your todo!");
    }
    todosStore.setAddNewTodo(value);
    setValue("");
  };
  return (
    <StyledForm>
      <FieldInput
        place="create"
        placeholder="What needs to be done?"
        value={value}
        onChange={handleChangeValue}
        onSubmit={handleSubmit}
      />
    </StyledForm>
  );
}

export default FormTodo;
