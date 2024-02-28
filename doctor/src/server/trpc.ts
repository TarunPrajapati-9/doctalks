import { initTRPC, TRPCError } from "@trpc/server";
import createContext from "./context";

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isDoctorMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isValidDoctor) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized user" });
  }
  return next({ ctx });
});

export const doctorProcedure = t.procedure.use(isDoctorMiddleware);
