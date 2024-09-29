/// <reference types="vite/client" />

declare type AnyFunction = (...args: Array<any>) => any;
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_DEFAULT_TENANT: string;
  readonly VITE_COMPANY_LOGO_URL_SMALL: string;
  readonly VITE_COMPANY_LOGO_URL_LARGE: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ANCHOR_PREFIX: string;
  readonly VITE_APPLICATION_IDENTIFIER: string;
  readonly VITE_OTLP_EXPORTER_CONFIG_BASE_URL: string;
  readonly VITE_SEMRESATTRS_SERVICE_NAME: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
