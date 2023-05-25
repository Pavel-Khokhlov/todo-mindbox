import React, { ReactNode } from 'react';
import { styled } from '@linaria/react';

type BaseTextProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 'p';
  children?: ReactNode;
  className?: string;
}

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

const StyledText = styled.h1`
  margin: 0;
  font-size: min(16px, 3.75vw);
  font-family: 'Roboto Condensed', sans-serif;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  &.header {
    color: tomato;
    font-family: 'Dosis', sans-serif;
    font-size: min(60px, 10vw);
    font-weight: 600;
    padding: 10px 0;
  }
  &.footer {
    font-size: min(14px, 3.5vw);
    font-weight: 300;
    padding: 10px 0;
  }
  &.button {
    font-size: min(16px, 3.75vw);
  }
  &.modal {
    width: 100%
  }
`;

const BaseText = ({
  level,
  children,
  className,
}: BaseTextProps) => {
  const tag = level === `p` ? 'p' : (`h${level}` as TextTag);
  return (
    <StyledText as={tag} className={className}>
      {children}
    </StyledText>
  );
}

export default BaseText;
