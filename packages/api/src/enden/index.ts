import type { Api as server } from "@camaras/api/src";
import { env } from "@camaras/api/src/utils/envs";
import { treaty } from "@elysiajs/eden";

export const api = treaty<server>(env.NEXT_PUBLIC_BACKEND_URL).api;
