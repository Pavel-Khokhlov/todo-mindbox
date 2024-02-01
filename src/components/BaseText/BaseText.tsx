import React, { CSSProperties, ReactNode } from 'react';
import { styled } from '@linaria/react';

type BaseTextProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 'p';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

const StyledText = styled.h1`
  margin: 0;
  font-size: min(16px, 3.75vw);
  font-family: 'RobotoCondensedLight', sans-serif;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  &.header {
    color: tomato;
    font-family: 'RubikScribbleRegular', sans-serif;
    font-size: min(40px, 8vw);
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
    font-size: min(22px, 4vw);
    font-weight: 700;
    margin-bottom: min(30px, 5vw);
  }
  &.locale {
    font-size: min(22px, 5vw);
  }
`;

const BaseText = ({
  level,
  children,
  className,
  style,
}: BaseTextProps) => {
  const tag = level === `p` ? 'p' : (`h${level}` as TextTag);
  return (
    <StyledText as={tag} className={className} style={style}>
      {children}
    </StyledText>
  );
}

export default BaseText;
