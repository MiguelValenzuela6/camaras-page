import { PrismaClient } from "@camaras/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  anonymous,
  organization,
  phoneNumber,
} from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: "Camaras-Page",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [phoneNumber(), organization(), anonymous(), admin()],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});
