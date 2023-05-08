import React from 'react';
import { styled } from '@linaria/react';
import BaseText from '../BaseText/BaseText';
import app_json from "../../../package.json";

const FooterLow = styled.footer`
  width: 80vw;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <FooterLow>
      <BaseText level={'p'} className="footer">&#9400; 2022 - {currentYear} Copyright by Pavel Khokhlov</BaseText>
      <BaseText level={'p'} className="footer">Version: {app_json.version}</BaseText>
    </FooterLow>
  );
}
