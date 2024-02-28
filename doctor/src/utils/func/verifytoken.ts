import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function verifyTokenServerSize(): boolean {
  const token = cookies().get("doctalks_doctor_token")?.value ?? "";
  if (token.length === 0) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}
