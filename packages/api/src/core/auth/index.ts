import { auth } from "@camaras/auth";
import { Elysia } from "elysia";

// user middleware (compute user and session and pass to routes)
const userMiddleware = async (request: Request) => {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return {
      user: null,
      session: null,
    };
  }

  return {
    user: session.user,
    session: session.session,
  };
};

export const authCore = new Elysia({ name: "Service.Auth" })
  .derive({ as: "scoped" }, ({ request }) => userMiddleware(request))
  .macro(({ onBeforeHandle }) => ({
    // This is declaring a service method
    isSignIn(value: boolean) {
      onBeforeHandle(({ session, user, error }) => {
        if (!session && !user) {
          return error(401, "Unauthorized");
        }
      });
    },
  }));
