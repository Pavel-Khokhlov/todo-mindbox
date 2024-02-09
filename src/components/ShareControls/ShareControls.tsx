import React, { useContext } from "react";
import { styled } from "@linaria/react";
import SVG from "react-inlinesvg";
import { observer } from "mobx-react-lite";
import { SVGProps } from "../FieldInput/FieldInput";
import IconCopy from "../../assets/icons/copy.svg";

import {
  TelegramShareButton,
  VKShareButton,
  ViberShareButton,
  WhatsappShareButton,
  TelegramIcon,
  VKIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import { useStore } from "../../store";
import { TranslationContext } from "../../context/TranslationContext";
import { copyTextToClipboard } from "../../utils";
import { FILTER, TodoItemProps } from "../../store/todos";

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
  opacity: 0
  box-sizing: border-box;
  transition: all 0.8s ease;
  pointer-events: none;
  &._active {
    opacity: 1;
    pointer-events: auto;
  }
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
  const { theme, isNotificationShown } = globalUIStore;
  const { todosList, activeTodos, completedTodos, filterValue } = todosStore;
  const t = useContext(TranslationContext);

  const hasTodos = todosList.length > 0;

  const getList = () => {
    let message: string = `${
      t[`header_title_${filterValue}` as keyof typeof t]
    }\n`;
    let list: TodoItemProps[] = [];
    if (filterValue === FILTER.ALL) list = todosList;
    if (filterValue === FILTER.ACTIVE) list = activeTodos;
    if (filterValue === FILTER.COMPLETED) list = completedTodos;
    if (list.length === 0) message = "";
    list
      .slice()
      .sort((a, b) => {
        return b.id - a.id;
      })
      .forEach(
        (item, index) => (message = message + `${index + 1}. ${item.name}\n`)
      );
    return message;
  };

  const handleCopy = () => {
    if (!isNotificationShown) {
      copyTextToClipboard(getList());
      globalUIStore.setIsNotificationShown(true);
    }
  };
  return (
    <StyledShareControls className={hasTodos ? "_active" : ""}>
      <StyledShareButton onClick={handleCopy}>
        <StyledIconCopy
          src={IconCopy}
          color={theme.infoColor}
          width={32}
          height={32}
        />
      </StyledShareButton>
      <VKShareButton url={getList()}>
        <VKIcon size={32} round={true} />
      </VKShareButton>
      <TelegramShareButton url={getList()}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <WhatsappShareButton url={getList()}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <ViberShareButton url={getList()}>
        <ViberIcon size={32} round={true} />
      </ViberShareButton>
    </StyledShareControls>
  );
});

export default ShareControls;
