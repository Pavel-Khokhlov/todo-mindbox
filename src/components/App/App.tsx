import React, { useEffect } from "react";
import { styled } from "@linaria/react";
import MainScreen from "../MainScreen/MainScreen";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notification from "../Notification/Notification";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { KEY_TODOS } from "../../utils";

import {
  TranslationContext,
  translations,
} from "../../context/TranslationContext";
import ModalEdit from "../ModalEdit/ModalEdit";

const StyledApp = styled.section`
  position: relative;
  width: 100vw;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const App = observer(() => {
  const { globalUIStore, todosStore } = useStore();
  const {locale, isNotificationShown, isEditModalShown } = globalUIStore;

  useEffect(() => {
    if (todosStore.todosList.length !== 0) {
      localStorage.setItem(KEY_TODOS, JSON.stringify(todosStore.todosList));
    } else {
      localStorage.removeItem(KEY_TODOS);
    }
  }, [todosStore.todosList]);

  useEffect(() => {
    if (isNotificationShown) {
      setTimeout(() => {
        globalUIStore.setIsNotificationShown(false);
      }, 3000);
    }
  }, [isNotificationShown, globalUIStore]);

  return (
    <TranslationContext.Provider value={translations[locale]}>
      <StyledApp>
        <Header />
        <MainScreen />
        <Footer />
        <ModalEdit isVisible={isEditModalShown} />
      </StyledApp>
      <Notification isVisible={isNotificationShown} />
    </TranslationContext.Provider>
  );
});

export default App;
