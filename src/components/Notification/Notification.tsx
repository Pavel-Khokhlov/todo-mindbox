import React from "react";
import { styled } from "@linaria/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

interface NotificationProps {
  isVisible: boolean;
}

const StyledNotification = styled.div`
  display: block;
  position: absolute;
  top: min(100px, 13vw);
  right: -100%;
  z-index: 100;
  width: min(400px, 80vw);
  min-height: 100px;
  overflow: auto;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border-radius: min(10px, 2vw);
  opacity: 0.1
  transition: all 0.8s ease;
  &._active {
    right: 4%;
    opacity: 1;
  }
`;

const Notification = observer(({ isVisible }: NotificationProps) => {
  const { globalUIStore } = useStore();
  const { theme } = globalUIStore;
  return (
    <StyledNotification
      className={isVisible ? "_active" : ""}
      style={{ background: theme.notificationBodyColor }}
    ></StyledNotification>
  );
});

export default Notification;
