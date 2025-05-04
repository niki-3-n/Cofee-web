/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // добавьте здесь другие переменные среды
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 