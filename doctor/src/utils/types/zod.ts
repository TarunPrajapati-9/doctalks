import { Specialization } from "@prisma/client";
import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const OUTPUT = z.object({
  token: z.string().nullable(),
  success: z.boolean(),
  message: z.string(),
});

export const SIGN_UP_SCHEMA_DOCTOR = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(6),
  specialization: z.nativeEnum(Specialization),
  certification: z.string(),
});

export const LISTING_CREATE = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  average_duration: z.string(),
  time: z.string(),
});
