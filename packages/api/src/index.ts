import { auth } from "@camaras/auth";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { type Context, Elysia } from "elysia";
import "./utils/envs";

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  }
  return context.error(405);
};

export const api = new Elysia({
  prefix: "/api",
})
  .use(cors())
  .use(swagger())
  .all("/auth/*", betterAuthView)
  .get("/hola", () => "hola");

export type Api = typeof api;
