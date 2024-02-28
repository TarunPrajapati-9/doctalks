/**
 * _ naming convention represents that the following function uses AI
 */
export default async function isValidCertificate(file: File) {
  try {
    const model = ai?.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = `
    Prompt: Please analyze the provided Base64-encoded medical certificate and determine if it is a valid certificate.
    Response: True (if the provided Base64-encoded medical certificate is valid) or False (if the provided Base64-encoded medical certificate is not valid).`;
    // TODO verify certificate from passed buffer
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
}
