// eslint-disable-next-line
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_SERVER_URL_DEVELOPMENT: string;
  readonly VITE_API_SERVER_URL_PRODUCTION: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
