import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import MainScreen, { TodoItemProps } from '../MainScreen/MainScreen';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

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

export default function App() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const handleClose = () => {
    setIsEditModalOpen(false)
  };
  const handleCloseByEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  }
  const handleEditClick = (item: TodoItemProps) => {
    setIsEditModalOpen(true)
    console.log(item)
  }
  useEffect(() => {
    if (isEditModalOpen) {
      document.addEventListener("keydown", (e) => {
        handleCloseByEsc(e);
      })
    } else (
      document.removeEventListener("keydown", (e) => {
        handleCloseByEsc(e);
      })
    )
  }, [isEditModalOpen])
  return (
      <StyledApp>
        <Header />
        <MainScreen onEditClick={handleEditClick} />
        <Footer />
        <Modal isShown={isEditModalOpen} title={"MODAL"} onClose={handleClose}/>
      </StyledApp>
  );
}
