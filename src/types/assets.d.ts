// src/react-app-env.d.ts
/// <reference types="react-scripts" />

// Для CSS
declare module '*.css' {
  const content: void;
  export default content;
}

// Для шрифтов
declare module '*.ttf' {
  const src: string;
  export default src;
}

declare module '*.otf' {
  const src: string;
  export default src;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.eot' {
  const src: string;
  export default src;
}