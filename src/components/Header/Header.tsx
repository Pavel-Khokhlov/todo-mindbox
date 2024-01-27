import React from "react";
import { styled } from "@linaria/react";
import SVG from "react-inlinesvg";
import BaseText from "../BaseText/BaseText";
import IconMoon from "../../assets/icons/moon.svg";
import IconSun from "../../assets/icons/sun.svg";
import { SVGProps } from "../FieldInput/FieldInput";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import { TODO_THEME, Theme } from "../../styles/themes";
// import { useTranslation } from "react-i18next";

const HeaderTop = styled.header`
  width: 100vw;
  display: flex;
  align-items: center;
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

const Header = observer(() => {
  const { globalUIStore } = useStore();
  const root = document.querySelector("#root");
  const handleToggleTheme = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (globalUIStore.theme.name === Theme.LightTheme) {
      localStorage.setItem(TODO_THEME, Theme.DarkTheme);
      root?.setAttribute("data-theme", Theme.DarkTheme);
      globalUIStore.setTheme(Theme.DarkTheme);
    } else {
      localStorage.setItem(TODO_THEME, Theme.LightTheme);
      root?.setAttribute("data-theme", Theme.LightTheme);
      globalUIStore.setTheme(Theme.LightTheme);
    }
  };
  return (
    <HeaderTop style={{ color: globalUIStore.theme.backgroundColor }}>
      <BaseText level={2} className="header">
        {"To-Do"}
      </BaseText>
      <StyledThemeButton
        src={globalUIStore.theme.name === Theme.LightTheme ? IconMoon : IconSun}
        onClick={handleToggleTheme}
        color={globalUIStore.theme.themeIconColor}
      />
    </HeaderTop>
  );
});

export default Header;
