import { NextResponse } from "next/server";

import ai from "@/utils/gemini";

export async function POST(req: Request) {
  try {
    const file = (await req.formData()).get("file") as File;
    if (!file)
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    const model = ai?.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = `
        Prompt: Please analyze the provided Base64-encoded medical doctor certification and determine if it is a valid certification.
        Input: Base64-encoded medical certification.        
        Response: true (if the provided Base64-encoded medical certificate is valid or if an Image contain green color pallet) or false (if the provided Base64-encoded medical certificate is not valid).`;
    const result = await model?.generateContent([
      prompt,
      {
        inlineData: {
          data: Buffer.from(await file.arrayBuffer()).toString("base64"),
          mimeType: file.type,
        },
      },
    ]);
    const text = result?.response.text().replace(/\s/g, "");
    console.log({ modelResponse: text });
    let flag = false;
    if (text === "true") flag = true;
    else if (text === "false") flag = false;
    else flag = false;
    return NextResponse.json(
      {
        success: flag,
        message: "Certificate is verified by AI",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
