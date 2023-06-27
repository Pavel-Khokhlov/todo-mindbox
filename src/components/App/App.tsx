import React, { FormEvent, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import MainScreen from "../MainScreen/MainScreen";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import FieldInput from "../FieldInput/FieldInput";
import BaseText from "../BaseText/BaseText";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { KEY_TODOS } from "../../utils";

const StyledApp = styled.section`
  position: relative;
  width: 100vw;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const StyledInfoBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  box-sizing: border-box;
`;

const App = observer(() => {
  const { globalUIStore, todosStore } = useStore();
  const [value, setValue] = useState<string>("");

  const canSave = todosStore.editableTodo?.name !== value;

  const getLocalDate = (value: number) => {
    return new Date(value).toDateString();
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
    if (todosStore.todosList.length !== 0) {
      localStorage.setItem(KEY_TODOS, JSON.stringify(todosStore.todosList));
    } else {
      localStorage.removeItem(KEY_TODOS);
    }
  }, [todosStore.todosList]);

  useEffect(() => {
    if (todosStore.editableTodo) {
      setValue(todosStore.editableTodo.name);
    } else {
      setValue("");
    }
  }, [todosStore.editableTodo]);

  return (
    <StyledApp>
      <Header />
      <MainScreen />
      <Footer />
      <Modal
        title={"Edit the task"}
        canSave={canSave}
        onSubmit={handleUpdateTodo}
      >
        <FieldInput
          value={value}
          place="modal"
          placeholder="Please, edit the task!"
          onChange={handleChangeValue}
        />
        <StyledInfoBlock>
          <BaseText level={"p"}>Created at:</BaseText>
          <BaseText level={6}>
            {todosStore.editableTodo?.id &&
              getLocalDate(todosStore.editableTodo?.id)}
          </BaseText>
        </StyledInfoBlock>
        {todosStore.editableTodo?.modified_at && (
          <StyledInfoBlock>
            <BaseText level={"p"}>Modified at:</BaseText>
            <BaseText level={6}>
              {(todosStore.editableTodo?.modified_at &&
                getLocalDate(todosStore.editableTodo?.modified_at)) ||
                "no info"}
            </BaseText>
          </StyledInfoBlock>
        )}
      </Modal>
    </StyledApp>
  );
});

export default App;
