import { Value } from "@sinclair/typebox/value";
import { Static, t } from "elysia";

const envSchema = t.Object({
  NODE_ENV: t.Union([t.Literal("development"), t.Literal("production")], {
    default: "development",
  }),
  AUTH_SECRET: t.String(),
  DATABASE_URL: t.String(),
  NEXT_PUBLIC_BACKEND_URL: t.String(),
  NEXT_PUBLIC_FRONTEND_URL: t.String(),
});

type EnvSchema = typeof envSchema.static;

const processEnv = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || "development",
};
// Valida las variables de entorno
const validateEnv = () => {
  if (!Value.Check(envSchema, processEnv)) {
    const errors = Value.Errors(envSchema, processEnv);
    for (const error of errors) {
      console.error(
        `❌ Variable inválida: ${error.path}, Detalles: ${error.message}`,
      );
    }
    throw new Error("Configuración de entorno inválida.");
  }
};

// Ejecuta la validación
validateEnv();

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}

export const env = Value.Cast(envSchema, processEnv);
