import React, { FormEvent, useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import FieldInput from "../FieldInput/FieldInput";
import BaseText from "../BaseText/BaseText";
import { styled } from "@linaria/react";
import { useStore } from "../../store";
import { TranslationContext } from "../../context/TranslationContext";

const StyledInfoBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  box-sizing: border-box;
`;

const ModalEdit = () => {
  const { globalUIStore, todosStore } = useStore();
  const t = useContext(TranslationContext);

  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const canSave = todosStore.editableTodo?.name !== value;

  const getLocalDate = (value: number) => {
    return new Date(value).toDateString();
  };

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleChangeValue = (e: FormEvent<HTMLInputElement>) => {
    const inputResult = e.currentTarget.value.trimStart();
    const updatedResult =
      inputResult.charAt(0).toUpperCase() + inputResult.slice(1);
    setValue(updatedResult);
  };

  const handleUpdateTodo = () => {
    todosStore.setUpdateTodo(value);
    globalUIStore.setEditModalShown(false);
  };

  useEffect(() => {
    if (todosStore.editableTodo && globalUIStore.isEditModalShown) {
      setValue(todosStore.editableTodo.name);
    } else {
      setValue("");
    }
  }, [globalUIStore.isEditModalShown, todosStore.editableTodo]);

  return (
    <Modal
      title="modal_edit_title"
      canSave={canSave}
      onSubmit={handleUpdateTodo}
    >
      <FieldInput
        value={value}
        place="modal"
        placeholder="modal_input_plh"
        onChange={handleChangeValue}
        onBlur={handleFocus}
        isFocused={isFocused}
      />
      <StyledInfoBlock>
        <BaseText level={"p"}>{t.modal_task_created}</BaseText>
        <BaseText level={6}>
          {todosStore.editableTodo?.id &&
            getLocalDate(todosStore.editableTodo?.id)}
        </BaseText>
      </StyledInfoBlock>
      {todosStore.editableTodo?.modified_at && (
        <StyledInfoBlock>
          <BaseText level={"p"}>{t.modal_task_modified}</BaseText>
          <BaseText level={6}>
            {(todosStore.editableTodo?.modified_at &&
              getLocalDate(todosStore.editableTodo?.modified_at)) ||
              "no info"}
          </BaseText>
        </StyledInfoBlock>
      )}
    </Modal>
  );
};

export default ModalEdit;
