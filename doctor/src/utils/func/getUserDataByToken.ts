import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type ReturnType = { id: string; email: string; name: string };

export default function getUserDataByToken(): ReturnType | null {
  try {
    const token = cookies().get("doctalks_doctor_token")?.value ?? "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "Arshil");
    return decoded as ReturnType;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
