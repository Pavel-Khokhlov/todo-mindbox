import React from 'react';
import { styled } from '@linaria/react';
import BaseText from '../BaseText/BaseText';

const HeaderTop = styled.header`
  width: 100vw;
`;

export default function Header() {
  return (
    <HeaderTop>
      <BaseText level={1} className="header">
        todos
      </BaseText>
    </HeaderTop>
  );
}
