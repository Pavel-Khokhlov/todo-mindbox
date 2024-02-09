import React from 'react';
import { styled } from '@linaria/react';
import BaseText from '../BaseText/BaseText';
import app_json from "../../../package.json";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px min(300px, 5vw);
  box-sizing: border-box;
`;

const Footer = observer(() => {
  const { globalUIStore } = useStore();
  const { theme } = globalUIStore;
  const currentYear = new Date().getFullYear();
  return (
    <StyledFooter style={{ backgroundColor: theme.backgroundColor, color: theme.textGreyColor }}>
      <BaseText level={'p'} className="footer">&#9400; 2022 - {currentYear} Copyright by Pavel Khokhlov</BaseText>
      <BaseText level={'p'} className="footer">Version: {app_json.version}</BaseText>
    </StyledFooter>
  );
})

export default Footer;