// src/types/css.d.ts
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Для SCSS/SASS
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

// Для обычного импорта CSS с побочным эффектом
declare module '*.css' {
  const content: void;
  export default content;
}