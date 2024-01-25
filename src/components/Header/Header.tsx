import React from "react";
import { styled } from "@linaria/react";
import SVG from "react-inlinesvg";
import BaseText from "../BaseText/BaseText";
import IconMoon from "../../assets/icons/moon.svg";
import IconSun from "../../assets/icons/sun.svg";
import { SVGProps } from "../FieldInput/FieldInput";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
// import { useTranslation } from "react-i18next";

export type ThemeName = "light" | "dark";

export enum Theme {
  LightTheme = "light",
  DarkTheme = "dark",
}

const HeaderTop = styled.header`
  width: 100vw;
  display: flex;
  align-items: center;
`;

const StyledThemeButton = styled(SVG)<SVGProps>`
  width: min(30px, 5vw);
  height: min(30px, 5vw);
  margin-left: auto;
  transform: rotate(-45deg);
  cursor: pointer;
`;

export const TODO_THEME = "todo_theme";

const Header = observer(() => {
  const {globalUIStore} = useStore()
  // const t = useTranslation();
  const root = document.querySelector("#root");
  const handleToggleTheme = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (globalUIStore.isLightTheme) {
      localStorage.setItem(TODO_THEME, Theme.DarkTheme);
      root?.setAttribute('data-theme', Theme.DarkTheme);
      globalUIStore.setIsLightTheme(false);
    } else {
      localStorage.setItem(TODO_THEME, Theme.LightTheme);
      root?.setAttribute('data-theme', Theme.LightTheme);
      globalUIStore.setIsLightTheme(true);
    }
  }
  return (
    <HeaderTop>
      <BaseText level={2} className="header">
        {"To-Do"}
      </BaseText>
      <StyledThemeButton
        src={globalUIStore.isLightTheme ? IconMoon : IconSun}
        onClick={handleToggleTheme}
        color={globalUIStore.isLightTheme ?"rgba(0, 0, 200, 0.5)" : "rgb(255,216,0)"}
      />
    </HeaderTop>
  );
})

export default Header;
