import React from "react";
import { styled } from "@linaria/react";
import BaseText from "../BaseText/BaseText";
// import { useTranslation } from "react-i18next";

const HeaderTop = styled.header`
  width: 100vw;
`;

export default function Header() {
  // const t = useTranslation();
  return (
    <HeaderTop>
      <BaseText level={2} className="header">
        { "To-Do" }
      </BaseText>
    </HeaderTop>
  );
}
