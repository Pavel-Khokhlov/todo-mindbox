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

import { LOCALES, TranslationContext } from "../../context/TranslationContext";

const HeaderTop = styled.header`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: currentColor;
  padding: 0 min(50px, 5vw);
  box-sizing: border-box;
`;

const StyledThemeButton = styled(SVG)<SVGProps>`
  width: min(30px, 5vw);
  height: min(30px, 5vw);
  margin-left: auto;
  transform: rotate(-45deg);
  cursor: pointer;
`;

const StyledLocaleButton = styled.button`
  width: min(30px, 5vw);
  height: min(30px, 5vw);
  margin-right: auto;
  cursor: pointer;
  border: none;
  background: transparent;
`;

const Header = observer(() => {
  const { globalUIStore } = useStore();
  const t = useContext(TranslationContext);

  const handleToggleTheme = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    globalUIStore.setTheme(
      globalUIStore.theme.name === THEME.LIGHTTHEME
        ? THEME.DARKTHEME
        : THEME.LIGHTTHEME
    );
  };

  const handleToggleLanguage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    globalUIStore.setLocale(
      globalUIStore.locale === LOCALES.ENGLISH
        ? LOCALES.RUSSIAN
        : LOCALES.ENGLISH
    );
  };

  return (
    <HeaderTop style={{ color: globalUIStore.theme.backgroundColor }}>
      <StyledLocaleButton onClick={handleToggleLanguage}>
        <BaseText
          level={2}
          className="locale"
          style={{
            color: globalUIStore.theme.textColor,
          }}
        >
          {globalUIStore.locale === LOCALES.ENGLISH ? "Ru" : "En"}
        </BaseText>
      </StyledLocaleButton>
      <BaseText level={2} className="header">
        {t.header_title}
      </BaseText>
      <StyledThemeButton
        src={globalUIStore.theme.name === THEME.LIGHTTHEME ? IconMoon : IconSun}
        onClick={handleToggleTheme}
        color={globalUIStore.theme.themeIconColor}
      />
    </HeaderTop>
  );
});

export default Header;
