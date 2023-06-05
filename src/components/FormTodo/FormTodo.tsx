import React, { FormEvent, useState } from "react";
import { styled } from "@linaria/react";
import FieldInput from "../FieldInput/FieldInput";

interface FormTodoProps {
  onSubmit: (v: string) => void;
}

const StyledForm = styled.form`
  width: 100%;
  text-align: start;
`;

const FormTodo = ({onSubmit}: FormTodoProps) => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue = (e: FormEvent<HTMLInputElement>) => {
    const inputResult = e.currentTarget.value.trimStart();
    const updatedResult =
      inputResult.charAt(0).toUpperCase() + inputResult.slice(1);
    setValue(updatedResult);
  };

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  if (value.length === 0) {
    return alert("Please, enter your todo!");
  }
  onSubmit(value);
  setValue("");
}

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FieldInput
        value={value}
        place="create"
        onChange={handleChangeValue}
        placeholder="What needs to be done?"
        onAddClick={handleSubmit}
        disabled={!value}
      />
    </StyledForm>
  );
}

export default FormTodo;
