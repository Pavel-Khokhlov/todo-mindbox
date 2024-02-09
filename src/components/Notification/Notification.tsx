import React, { useContext } from "react";
import { styled } from "@linaria/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import BaseText from "../BaseText/BaseText";
import { TranslationContext } from "../../context/TranslationContext";

interface NotificationProps {
  isVisible: boolean;
}

const StyledNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: min(100px, 13vw);
  right: -100%;
  z-index: 100;
  width: min(400px, 80vw);
  overflow: auto;
  padding: min(20px, 3vw);
  margin: 0;
  box-sizing: border-box;
  border-radius: min(10px, 2vw);
  opacity: 0
  transition: all 0.8s ease;
  border-left: 5px solid green;
  &._active {
    right: 4%;
    opacity: 1;
  }
`;

const Notification = observer(({ isVisible }: NotificationProps) => {
  const { globalUIStore } = useStore();
  const { theme } = globalUIStore;
  const t = useContext(TranslationContext);
  return (
    <StyledNotification
      className={isVisible ? "_active" : ""}
      style={{ background: theme.notificationBodyColor }}
    >
      <BaseText level={"p"} style={{ color: theme.textNotificationColor }}>
        {t.notification_success}
      </BaseText>
    </StyledNotification>
  );
});

export default Notification;
