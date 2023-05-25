import { createContext } from 'react';

type ContextProps = {
  [key: string]: { [key: string]: string };
};

export const TranslationContext = createContext<ContextProps>({})

export const translations = {
  en: {
    header_title: 'Todo list',
    input_placeholder: 'Enter new task',
  },
  ru: {
    header_title: 'Список дел',
    input_placeholder: 'Создайте задачу',
  }
};
