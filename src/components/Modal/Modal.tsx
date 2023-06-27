import React, { ReactNode, useCallback, useEffect } from "react";
import SVG from "react-inlinesvg";
import { styled } from "@linaria/react";
import BaseText from "../BaseText/BaseText";
import IconClose from "../../assets/icons/close.svg";
import { SVGProps, StyledButton } from "../FieldInput/FieldInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
// import { useTranslation } from "react-i18next";

interface ModalProps {
  title: string;
  children?: ReactNode;
  canSave: boolean;
  onSubmit: () => void;
}

const StyledModal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  @media screen and (max-width: 450px) {
    align-items: start;
    padding-top: 60px;
  }
`;

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: min(500px, 90vw);
  min-height: 30vh;
  background: white;
  padding: min(40px, 7vw) min(20px, 3vw);
  border-radius: min(20px, 3vw);
`;

const StyledCloseButton = styled(SVG)<SVGProps>`
  position: absolute;
  top: min(-40px, -6vh);
  left: 50%;
  transform: translate(-50%, 0);
  width: min(40px, 8vw);
  height: min(40px, 8vw);
  @media screen and (max-width: 450px) {
    top: min(-40px, -6vh);
    left: 50%;
  }
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: center;
  gap: min(30px, 5vw);
  margin: auto auto 0;
`;

const StyledButtonCommon = styled.button`
  width: min(200px, 40vw);
  height: min(50px, 10vw);
  font-size: min(20px, 4vw);
  background: none;
  border-radius: min(8px, 2vw);
  cursor: pointer;
`;

const StyledCancelButton = styled(StyledButtonCommon)`
  color: rgba(0, 0, 200, 0.5);
  border: 1px solid rgba(0, 0, 200, 0.5);
`;

const StyledSubmitButton = styled(StyledButtonCommon)`
  color: lightgray;
  border: 1px solid lightgray;
  cursor: pointer;
  transition: all 0.5s ease;
  &.active {
    color: white;
    border: 1px solid rgba(0, 0, 200, 0.5);
    background-color: rgba(0, 0, 200, 0.5);
  }
`;

const Modal = observer(({ title, children, canSave, onSubmit }: ModalProps) => {
  const { globalUIStore } = useStore();

  const handleCloseModal = useCallback(() => {
    globalUIStore.setEditModalShown(false);
  }, [globalUIStore])

  const handleCloseByEsc = useCallback(function (e: KeyboardEvent): void {
    if (e.key === "Escape") return handleCloseModal();
  }, [handleCloseModal]);

  useEffect(() => {
    if (globalUIStore.isEditModalShown) {
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        handleCloseByEsc(e);
      });
    } else {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        handleCloseByEsc(e);
      });
    }
  }, [globalUIStore.isEditModalShown, handleCloseByEsc]);

  const buttonSubmitClass = canSave ? "active" : "";

  if (!globalUIStore.isEditModalShown) {
    return null;
  }
  return (
    <StyledModal onClick={handleCloseModal}>
      <StyledBody onClick={(event) => event.stopPropagation()}>
        <StyledButton onClick={handleCloseModal}>
          <StyledCloseButton
            src={IconClose}
            onClick={handleCloseModal}
            color="rgba(255, 255, 255, 0.7)"
          />
        </StyledButton>
        <BaseText level={3} className="modal">
          {title}
        </BaseText>
        {children}
        <StyledBottom>
          <StyledCancelButton onClick={handleCloseModal}>CANCEL</StyledCancelButton>
          <StyledSubmitButton onClick={onSubmit} className={buttonSubmitClass} disabled={!canSave}>SAVE</StyledSubmitButton>
        </StyledBottom>
      </StyledBody>
    </StyledModal>
  );
});

export default Modal;
