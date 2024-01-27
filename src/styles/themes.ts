export const TODO_THEME = "todo_theme";

export type ThemeName = "light" | "dark";

export interface ThemeProps {
  name: ThemeName;
  transparent: string;
  brandColor: string;
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  infoColor: string;
  errorColor: string;
  dangerColor: string;
  boxShadowColor: string;
  textInputColor: string;
  textColor: string;
  textGreyColor: string;
  textDisableColor: string;
  disabledColor: string;
  placeholderColor: string;
  linkColor: string;
  focusColor: string;
  headerColor: string;
  themeIconColor: string;
  backgroundColor: string;
  mainBodyColor: string;
}

export enum Theme {
  LightTheme = "light",
  DarkTheme = "dark",
}

export const themes = {
  light: {
    name: Theme.LightTheme,
    transparent: "rgba(0, 0, 0, 0)",
    brandColor: "rgb(0, 0, 0)",
    primaryColor: "rgb(0, 0, 0)",
    secondaryColor: "rgba(255, 255, 255, 1)",
    successColor: "rgba(10, 150, 10, 1)",
    infoColor: "rgba(0, 0, 200, 0.5)",
    errorColor: "rgb(255, 0, 0)",
    dangerColor: "rgb(255, 0, 0)",
    boxShadowColor: "rgba(0, 0, 0, 0.2)",
    textInputColor: "rgba(0, 0, 0, 1)",
    textColor: "rgba(0, 0, 0, 0.9)",
    textGreyColor: "rgba(0, 0, 0, 0.5)",
    textDisableColor: "rgba(0, 0, 0, 0.2)",
    disabledColor: "rgba(10, 10, 10, 0.2)",
    placeholderColor: "rgb(128, 128, 128)",
    linkColor: "rgb(0, 0, 255)",
    focusColor: "rgb(0, 0, 255)",
    headerColor: "rgb(247, 238, 205)",
    themeIconColor: "rgba(0, 0, 200, 0.5)",
    backgroundColor: "rgba(245, 245, 245, 1)",
    mainBodyColor: "rgba(245, 245, 245, 1)",
  },
  dark: {
    name: Theme.DarkTheme,
    transparent: "rgba(0, 0, 0, 0)",
    brandColor: "rgb(0, 0, 0)",
    primaryColor: "rgb(0, 0, 0)",
    secondaryColor: "rgba(255, 255, 255, 1)",
    successColor: "rgb(0, 255, 0)",
    infoColor: "rgba(50, 170, 255, 1)",
    errorColor: "rgb(255, 0, 0)",
    dangerColor: "rgb(255, 100, 0)",
    boxShadowColor: "rgba(0, 0, 0, 0.4)",
    textInputColor: "rgba(255, 255, 255, 1)",
    textColor: "rgba(255, 255, 255, 0.9)",
    textGreyColor: "rgba(255, 255, 255, 0.5)",
    textDisableColor: "rgba(255, 255, 255, 0.2)",
    disabledColor: "rgba(255, 255, 255, 0.3)",
    placeholderColor: "rgb(128, 128, 128)",
    linkColor: "rgb(0, 0, 255)",
    focusColor: "rgb(0, 0, 255)",
    headerColor: "rgb(40, 44, 52)",
    themeIconColor: "rgba(255, 216, 0, 1)",
    backgroundColor: "rgba(16, 16, 16, 1)",
    mainBodyColor: "rgba(51, 51, 53, 1)",
  },
};
