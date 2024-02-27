import { GoogleGenerativeAI } from "@google/generative-ai";

declare global {
  var ai: GoogleGenerativeAI | undefined;
}

const ai =
  globalThis.ai || new GoogleGenerativeAI(process.env.GEMINI_SECRET ?? "");

if (process.env.NODE_ENV !== "production") globalThis.ai = ai;

export default ai;
