import React, { ReactNode } from "react";
import SVG from 'react-inlinesvg';
import { styled } from "@linaria/react";
import BaseText from "../BaseText/BaseText";
import IconClose from '../../assets/icons/close.svg';
import { SVGProps, StyledButton } from "../FieldInput/FieldInput";
// import { useTranslation } from "react-i18next";

interface ModalProps {
  isShown: boolean;
  title: string;
  onClose?: () => void;
  onChange?: (value: number) => void;
  children?: ReactNode;
}

const StyledModal = styled.section`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const StyledBody = styled.div`
  position: relative;
  width: min(500px, 90vw);
  min-height: 30vh;
  background: white;
  padding: min(20px, 3vw);
  border-radius: min(20px, 3vw);
`;

const StyledCloseButton = styled(SVG)<SVGProps>`
  position: absolute;
  top: min(-50px, -7vw);
  left: 50%;
  transform: translate(-50%, 0);
  width: min(40px, 6.25vw);
  height: min(40px, 6.25vw);
`

export default function Modal({isShown, title, children, onClose }: ModalProps) {
  // const t = useTranslation();
  if (!isShown) {
    return null;
  }
  return (
    <StyledModal>
      <StyledBody>
      <StyledButton onClick={onClose}>
        <StyledCloseButton src={IconClose} onClick={onClose} color="rgba(255, 255, 255, 0.7)" />
        </StyledButton>
        <BaseText level={3} className="modal">{ title }</BaseText>
        { children }
      </StyledBody>
    </StyledModal>
  );
}
