import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { styled } from "@linaria/react";
import MainScreen, { TodoItemProps } from "../MainScreen/MainScreen";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import FieldInput from "../FieldInput/FieldInput";
import BaseText from "../BaseText/BaseText";

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

export default function App() {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>();
  const [modifiedDate, setModifiedDate] = useState<string>();

  const handleClose = () => {
    setIsEditModalOpen(false);
    setModifiedDate("")
  };

  const handleCloseByEsc = useCallback(function (e: KeyboardEvent): void {
    if (e.key === "Escape") return handleClose();
  }, []);

  function handleEditClick(item: TodoItemProps): void {
    setIsEditModalOpen(true);
    setValue(item.name);
    item.id && setCreatedDate(new Date(item.id).toDateString());
    item.modified_at && setModifiedDate(new Date(item.modified_at).toDateString());
  }

  const handleTaskChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (isEditModalOpen) {
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        handleCloseByEsc(e);
      });
    } else {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        handleCloseByEsc(e);
      });
    }
  }, [handleCloseByEsc, isEditModalOpen]);

  return (
    <StyledApp>
      <Header />
      <MainScreen onEditClick={handleEditClick} />
      <Footer />
      <Modal
        isShown={isEditModalOpen}
        title={"Edit the task"}
        onClose={handleClose}
      >
        <FieldInput
          value={value}
          place="modal"
          onChange={(e: any) => handleTaskChange(e)}
          placeholder="Please, edit the task!"
        />
        <StyledInfoBlock>
          <BaseText level={"p"}>Created at:</BaseText>
          <BaseText level={6}>{createdDate}</BaseText>
        </StyledInfoBlock>
        {modifiedDate && <StyledInfoBlock>
          <BaseText level={"p"}>Modified at:</BaseText>
          <BaseText level={6}>{modifiedDate || 'no info'}</BaseText>
        </StyledInfoBlock>}
      </Modal>
    </StyledApp>
  );
}
