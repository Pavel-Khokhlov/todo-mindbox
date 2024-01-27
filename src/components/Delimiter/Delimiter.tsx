import React, { CSSProperties } from 'react';
import { styled } from '@linaria/react';

export type DelimiterProps = {
  style?: CSSProperties;
}

const StyledDelimiter = styled.div`
  width: min(700px, 90vw);
  margin: 0 auto;
  height: 2px;
  transition: all 0.5s ease;
`;

export default function Delimiter({style}: DelimiterProps) {
  return (
    <StyledDelimiter style={style} />
  );
}
