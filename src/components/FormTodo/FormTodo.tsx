import React, { FormEvent, useState } from "react";
import { styled } from "@linaria/react";
import FieldInput from "../FieldInput/FieldInput";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import Delimiter from "../Delimiter/Delimiter";

const StyledForm = styled.form`
  width: 100%;
  text-align: start;
`;

const FormTodo = observer(() => {
  const { todosStore, globalUIStore } = useStore();
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

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

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };
  return (
    <>
      <StyledForm>
        <FieldInput
          place="create"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleChangeValue}
          onSubmit={handleSubmit}
          onBlur={handleFocus}
          isFocused={isFocused}
        />
      </StyledForm>
      <Delimiter
        style={{
          background: isFocused
            ? globalUIStore.theme.infoColor
            : globalUIStore.theme.disabledColor,
        }}
      />
    </>
  );
});

export default FormTodo;
