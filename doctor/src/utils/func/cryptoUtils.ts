import { createHash } from "node:crypto";

export default function createHashLocal(str: string): string {
  return createHash("sha256").update(str).digest("hex");
}
