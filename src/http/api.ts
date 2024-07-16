import apiClient from "./http-common";

interface GetUploadUrlRequest {
  name: string;
  contentType: string;
}

interface GetUploadUrlResponse {
  signedUrl: string;
  key: string;
}

async function getUploadUrl(
  payload: GetUploadUrlRequest
): Promise<GetUploadUrlResponse> {
  const reponse = await apiClient.post("/upload", payload);
  return reponse.data;
}

interface UploadFileRequest {
  file: File;
}

export async function uploadFile(payload: UploadFileRequest): Promise<string> {
  const { file } = payload;
  const { signedUrl, key } = await getUploadUrl({
    name: file.name,
    contentType: file.type,
  });
  apiClient
    .put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    })
    .then(() => {
      console.log("File uploaded");
    })
    .catch((error) => {
      console.error("Error uploading file", error);
    });
  return key;
}

interface ExtractTextRequest {
  objectKey: string;
}

export async function extractText(payload: ExtractTextRequest): Promise<any> {
  const response = await apiClient.post("/extract_text", payload);
  return response.data;
}
