import React from 'react';
import { styled } from '@linaria/react';

const StyledDelimiter = styled.div`
  width: min(600px, 90vw);
  margin: 0 auto;
  height: 1px;
  background: linear-gradient(90deg, #fff, #000000, #fff);
  opacity: 0.3;
`;

export default function Delimiter() {
  return (
    <StyledDelimiter />
  );
}
