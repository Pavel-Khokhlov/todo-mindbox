import React, { ReactNode, useCallback, useContext, useEffect } from "react";
import SVG from "react-inlinesvg";
import { styled } from "@linaria/react";
import BaseText from "../BaseText/BaseText";
import IconClose from "../../assets/icons/close.svg";
import { SVGProps, StyledButton } from "../FieldInput/FieldInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import { TranslationContext } from "../../context/TranslationContext";

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
    align-items: flex-start;
    padding-top: 120px;
  }
`;

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  transition: all 0.5s ease;
`;

const Modal = observer(({ title, children, canSave, onSubmit }: ModalProps) => {
  const { globalUIStore } = useStore();
  const t = useContext(TranslationContext);

  const handleCloseModal = useCallback(() => {
    globalUIStore.setEditModalShown(false);
  }, [globalUIStore]);

  const handleCloseByEsc = useCallback(
    function (e: KeyboardEvent): void {
      if (e.key === "Escape") return handleCloseModal();
    },
    [handleCloseModal]
  );

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

  if (!globalUIStore.isEditModalShown) {
    return null;
  }
  const buttonCancelStyle = {
    color: globalUIStore.theme.infoColor,
    border: `1px solid ${globalUIStore.theme.infoColor}`,
  };
  const buttonSubmitStyle = {
    cursor: canSave ? "pointer" : "none",
    color: canSave
      ? globalUIStore.theme.secondaryColor
      : globalUIStore.theme.greyColor,
    border: `1px solid ${
      canSave ? globalUIStore.theme.infoColor : globalUIStore.theme.greyColor
    }`,
    backgroundColor: canSave
      ? globalUIStore.theme.infoColor
      : globalUIStore.theme.transparent,
  };
  return (
    <StyledModal onClick={handleCloseModal}>
      <StyledBody onClick={(event) => event.stopPropagation()}>
        <StyledButton onClick={handleCloseModal}>
          <StyledCloseButton
            src={IconClose}
            onClick={handleCloseModal}
            color={globalUIStore.theme.secondaryColor}
          />
        </StyledButton>
        <BaseText level={2} className="modal">
          {t[title as keyof typeof t]}
        </BaseText>
        {children}
        <StyledBottom>
          <StyledButtonCommon
            onClick={handleCloseModal}
            style={buttonCancelStyle}
          >
            {t.modal_btn_cancel}
          </StyledButtonCommon>
          <StyledButtonCommon
            onClick={onSubmit}
            style={buttonSubmitStyle}
            disabled={!canSave}
          >
            {t.modal_btn_save}
          </StyledButtonCommon>
        </StyledBottom>
      </StyledBody>
    </StyledModal>
  );
});

export default Modal;
