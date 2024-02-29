import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { LOGIN_SCHEMA, OUTPUT, SIGN_UP_SCHEMA_DOCTOR } from "@/utils/types/zod";
import createHashLocal from "@/utils/func/cryptoUtils";
import db from "@/utils/db";

import { publicProcedure, router } from "../trpc";

// routers
import listingRouter from "./listings";

export const appRouter = router({
  login: publicProcedure
    .input(LOGIN_SCHEMA)
    .output(OUTPUT)
    .mutation(async ({ input }) => {
      try {
        const { email, password } = input;
        const hashedPwd = createHashLocal(password);
        const user = await db.doctor.findUnique({
          where: {
            d_email: email,
            d_password: hashedPwd,
          },
        });
        if (user) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.d_email,
              name: user.d_name,
            },
            process.env.JWT_SECRET ?? "Arshil"
          );
          cookies().set("doctalks_doctor_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
          return {
            message: "Login Success",
            success: true,
            token: token,
          };
        }
        return {
          message: "Invalid credentials",
          success: false,
          token: null,
        };
      } catch (error: any) {
        return {
          message: error.message,
          success: false,
          token: null,
        };
      }
    }),

  signUp: publicProcedure
    .input(SIGN_UP_SCHEMA_DOCTOR)
    .output(OUTPUT)
    .mutation(async ({ input }) => {
      try {
        const { email, password, username, specialization, certification } =
          input;
        const hashedPwd = createHashLocal(password);
        const user = await db.doctor.create({
          data: {
            d_email: email,
            d_password: hashedPwd,
            d_name: username,
            d_certificate: Buffer.from(certification),
            d_specialization: specialization,
          },
        });
        if (user) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.d_email,
              name: user.d_name,
            },
            process.env.JWT_SECRET ?? "Arshil"
          );
          cookies().set("doctalks_doctor_token", token);
          return {
            message: "Account created",
            success: true,
            token: token,
          };
        }
        return {
          message: "Account creation failed",
          success: false,
          token: null,
        };
      } catch (error: any) {
        console.log(error);
        return {
          message: error.message,
          success: false,
          token: null,
        };
      }
    }),
  listings: listingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
