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

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 0 5px;
  cursor: pointer;
  &.active {
    background: rgba(0, 0, 200, 0.5);
    color: white;
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
    <StyledButton type={type} id={id} className={className} onClick={onButtonClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

export default MainButton;
