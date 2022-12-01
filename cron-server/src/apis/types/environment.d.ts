export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SEOUL_CITY_API_ACCESS_KEY_SUB: string;
      SEOUL_CITY_API_ACCESS_KEY: string;
      MONGODB_CONNECT_URI: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
    }
  }
}
