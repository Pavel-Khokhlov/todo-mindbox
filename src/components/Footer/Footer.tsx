import React from 'react';
import { styled } from '@linaria/react';
import BaseText from '../BaseText/BaseText';
import app_json from "../../../package.json";

const StyledFooter = styled.footer`
  width: min(600px, 90vw);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <StyledFooter>
      <BaseText level={'p'} className="footer">&#9400; 2022 - {currentYear} Copyright by Pavel Khokhlov</BaseText>
      <BaseText level={'p'} className="footer">Version: {app_json.version}</BaseText>
    </StyledFooter>
  );
}
