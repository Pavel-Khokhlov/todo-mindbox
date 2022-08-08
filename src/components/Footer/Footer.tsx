import React from 'react';
import { styled } from '@linaria/react';
import BaseText from '../BaseText/BaseText';

const FooterLow = styled.footer`
  width: 100vw;
  padding-top: 20px;
`;

export default function Footer() {
  return (
    <FooterLow>
      <BaseText level={'p'} className="footer">@Copyright by Pavel Khokhlov</BaseText>
    </FooterLow>
  );
}
