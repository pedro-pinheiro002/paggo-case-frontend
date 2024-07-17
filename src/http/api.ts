import { toast } from "sonner";
import apiClient from "./http-common";
import { ExtractedText } from "@/types/types";
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
      toast.success("Uploado concluído!");
      console.log("File uploaded");
    })
    .catch((error) => {
      toast.error("Erro ao fazer upload");
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

interface ImportExtractedTextRequest {
  objectKey: string;
}
export async function importExtractedText(
  payload: ImportExtractedTextRequest
): Promise<ExtractedText> {
  const response = await apiClient.post("/import", payload);
  return response.data;
}
