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
  font-family: 'RobotoCondensedLight', sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  border: none;
  border-radius: 5px;
  padding: 0 5px;
  cursor: pointer;
  transition: all 2000 ease;
  &.delete {
    width: min(200px, 40vw);
    height: min(40px, 10vw);
    border-radius: 20px;
  }
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
