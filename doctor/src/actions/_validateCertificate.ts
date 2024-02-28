/**
 * _ naming convention represents that the following function uses AI
 */
"use server";

import ai from "@/utils/gemini";
export default async function _isValidCertificate(file: File) {
  try {
    const model = ai?.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = `
    Prompt: Please analyze the provided Base64-encoded medical certificate and determine if it is a valid certificate.
    Response: True (if the provided Base64-encoded medical certificate is valid) or False (if the provided Base64-encoded medical certificate is not valid).`;
    const result = await model?.generateContent([
      prompt,
      {
        inlineData: {
          data: Buffer.from(await file.arrayBuffer()).toString("base64"),
          mimeType: "image/*",
        },
      },
    ]);
    console.log({ result });
    // if ( === "true") return true;
    return false;
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
}
