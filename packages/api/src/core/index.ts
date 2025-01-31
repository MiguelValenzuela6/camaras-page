import Elysia from "elysia";
import { authCore } from "./auth";

export const coreApp = new Elysia({ name: "Service.Core" }).use(authCore);
