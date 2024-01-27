import React, { ReactNode } from 'react';
import { CSSProperties, styled } from '@linaria/react';

export type MainButtonProps = {
  key?: number;
  id?: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
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
`;

const MainButton = ({
  id,
  type,
  disabled,
  className,
  style,
  children,
  onButtonClick,
}: MainButtonProps) => {
  return (
    <StyledButton type={type} id={id} className={className} onClick={onButtonClick} disabled={disabled} style={style}>
      {children}
    </StyledButton>
  );
}

export default MainButton;
