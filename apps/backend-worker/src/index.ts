import { api } from "@camaras/api/src";
import { Elysia } from "elysia";

const app = api.listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
