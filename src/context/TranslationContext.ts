import { createContext } from "react";

export type LanguageType = "ru" | "en";

export enum LOCALES {
  ENGLISH = "en",
  RUSSIAN = "ru",
}

export const translations = {
  en: {
    header_title: `To-Do list`,
    header_title_all: "All list",
    header_title_active: "Active list",
    header_title_completed: "Completed list",
    // главный экран
    main_input_plh: `What is the  task to be done?`,
    // modal
    modal_edit_title: `Edit the task`,
    modal_btn_cancel: `CANCEL`,
    modal_btn_save: `SAVE`,
    modal_input_plh: `Edit the task`,
    modal_task_created: `Created at:`,
    modal_task_modified: `Modified at:`,
    // controls
    controls_clear: 'Clear completed',
    controls_all: 'All',
    controls_active: 'Active',
    controls_completed: 'Completed',
    // notification
    notification_success: 'This list has been copied successfully',
  },
  ru: {
    header_title: "Список дел",
    header_title_all: "Полный список дел",
    header_title_active: "Список не завершенных дел",
    header_title_completed: "Список завершенных дел",
    // главный экран
    main_input_plh: `Что необходимло сделать?`,
    // modal
    modal_edit_title: `Правка задачи`,
    modal_btn_cancel: `ОТМЕНА`,
    modal_btn_save: `СОХРАНИТЬ`,
    modal_input_plh: `Отредактируйте задачу`,
    modal_task_created: `Дата создания:`,
    modal_task_modified: `Дата изменения:`,
    // controls
    controls_clear: 'Удалить завершенные',
    controls_all: 'Все',
    controls_active: 'Открытые',
    controls_completed: 'Завершенные',
    // notification
    notification_success: 'Этот список был успешно скопирован!',
  },
};

export const TranslationContext = createContext(translations[LOCALES.ENGLISH]);
