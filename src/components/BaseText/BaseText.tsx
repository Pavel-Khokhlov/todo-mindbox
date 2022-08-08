import React, { ReactNode } from 'react';
import { styled } from '@linaria/react';

type BaseTextProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 'p';
  children?: ReactNode;
  className?: string;
}

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

const SText = styled.h1`
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
  &.header {
    color: tomato;
    font-family: 'Dosis', sans-serif;
    font-size: 80px;
    padding: 20px 0;
  }
  &.footer {
    font-size: 16px;
    padding: 10px 0;
  }
  &.button {
    font-size: 16px;
  }
`;

const BaseText = ({
  level,
  children,
  className,
}: BaseTextProps) => {
  const tag = level === `p` ? 'p' : (`h${level}` as TextTag);
  return (
    <SText as={tag} className={className}>
      {children}
    </SText>
  );
}

export default BaseText;
