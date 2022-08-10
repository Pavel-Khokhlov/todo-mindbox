import React, { ReactNode } from 'react';
import { styled } from '@linaria/react';

export type MainButtonProps = {
  key?: number;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
  children?: ReactNode;
  className?: string;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SButton = styled.button`
  margin: 0;
  padding: 0;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &.active {
    border-radius: 5px;
    border: 1px solid black;
    padding: 0 5px;
  }
`;

const MainButton = ({
  type,
  onButtonClick,
  id,
  className,
  disabled,
  children,
}: MainButtonProps) => {
  return (
    <SButton type={type} id={id} className={className} onClick={onButtonClick} disabled={disabled}>
      {children}
    </SButton>
  );
}

export default MainButton;
