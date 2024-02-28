export async function postCertificate(file: File) {
  const formData = new FormData();
  // parse file name
  const fileName = file.name.split(".");
  const fileType = fileName[fileName.length - 1];
  formData.append(
    "file",
    new File([file], `${Date.now()}.${fileType}`, { type: file.type })
  );
  const res = await fetch("/api/verifyCertificate", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
}
