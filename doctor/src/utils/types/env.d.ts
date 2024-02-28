declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly DATABASE_URL: string;
    readonly JWT_SECRET: string;
    readonly GEMINI_SECRET: string;
  }
}
