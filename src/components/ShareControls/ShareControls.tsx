import React, { useContext } from "react";
import { styled } from "@linaria/react";
import SVG from "react-inlinesvg";
import { observer } from "mobx-react-lite";
import { SVGProps } from "../FieldInput/FieldInput";
import IconCopy from "../../assets/icons/copy.svg";

import {
  LinkedinShareButton,
  TelegramShareButton,
  VKShareButton,
  ViberShareButton,
  WhatsappShareButton,
  LinkedinIcon,
  TelegramIcon,
  VKIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import { useStore } from "../../store";
import { TranslationContext } from "../../context/TranslationContext";
import { copyTextToClipboard } from "../../utils";

const StyledShareControls = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: min(20px, 3vw);
  width: 100%;
  overflow: auto;
  list-style: none;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
`;

const StyledShareButton = styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

const StyledIconCopy = styled(SVG)<SVGProps>`
  padding: 0;
  width: 32px;
  height: 32px;
`;

const ShareControls = observer(() => {
  const { todosStore, globalUIStore } = useStore();
  const { theme } = globalUIStore;
  const t = useContext(TranslationContext);
  const getList = (br: string) => {
    let message: string = t.header_title + br;
    todosStore.activeTodos.forEach(
      (item, index) => (message = message + `${index + 1}. ${item.name}${br}`)
    );
    return message;
  };
  const handleCopy = () => {
    copyTextToClipboard(getList("\n"));
  };
  return (
    <StyledShareControls>
      <StyledShareButton onClick={() => handleCopy()}>
        <StyledIconCopy
          src={IconCopy}
          color={theme.infoColor}
          width={32}
          height={32}
        />
      </StyledShareButton>
      {/* <LinkedinShareButton url={getList()}>
            <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>*/}
      <VKShareButton url={getList(`\n`)}>
        <VKIcon size={32} round={true} />
      </VKShareButton>
      <TelegramShareButton url={getList(`%0A`)}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <WhatsappShareButton url={getList(`\n`)}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <ViberShareButton url={getList(`\n`)}>
        <ViberIcon size={32} round={true} />
      </ViberShareButton>
    </StyledShareControls>
  );
});

export default ShareControls;
