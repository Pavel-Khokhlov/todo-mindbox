import React, { useContext } from "react";
import { styled } from "@linaria/react";
import SVG from "react-inlinesvg";
import BaseText from "../BaseText/BaseText";
import IconMoon from "../../assets/icons/moon.svg";
import IconSun from "../../assets/icons/sun.svg";
import { SVGProps } from "../FieldInput/FieldInput";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import { THEME } from "../../styles/themes";
import Notification from "../Notification/Notification";

import { LOCALES, TranslationContext } from "../../context/TranslationContext";

const HeaderTop = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: currentColor;
  padding: 0 min(50px, 5vw);
  box-sizing: border-box;
  padding-top: min(20px, 3vw);
  padding-bottom: min(30px, 5vw);
  z-index: 10;
`;

const StyledThemeButton = styled(SVG)<SVGProps>`
  width: min(30px, 5vw);
  height: min(30px, 5vw);
  margin-left: auto;
  transform: rotate(-45deg);
  cursor: pointer;
`;

export const StyledLocaleButton = styled.button`
  width: min(30px, 5vw);
  height: min(30px, 5vw);
  margin-right: auto;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const Header = observer(() => {
  const { globalUIStore } = useStore();
  const { theme, locale, isNotificationShown } = globalUIStore;
  const t = useContext(TranslationContext);

  const handleToggleTheme = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    globalUIStore.setTheme(
      theme.name === THEME.LIGHTTHEME ? THEME.DARKTHEME : THEME.LIGHTTHEME
    );
  };

  const handleToggleLanguage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    globalUIStore.setLocale(
      locale === LOCALES.ENGLISH ? LOCALES.RUSSIAN : LOCALES.ENGLISH
    );
  };

  return (
    <HeaderTop style={{ color: theme.backgroundColor }}>
      <StyledLocaleButton onClick={handleToggleLanguage}>
        <BaseText
          level={2}
          className="locale"
          style={{
            color: theme.textColor,
          }}
        >
          {locale === LOCALES.ENGLISH ? "Ru" : "En"}
        </BaseText>
      </StyledLocaleButton>
      <BaseText level={2} className="header">
        {t.header_title}
      </BaseText>
      <StyledThemeButton
        src={theme.name === THEME.LIGHTTHEME ? IconMoon : IconSun}
        onClick={handleToggleTheme}
        color={theme.themeIconColor}
      />
      <Notification isVisible={isNotificationShown} />
    </HeaderTop>
  );
});

export default Header;
