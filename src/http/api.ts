import { toast } from "sonner";
import apiClient from "./http-common";
import { ExtractedText, User } from "@/types/types";
interface GetUploadUrlRequest {
  name: string;
  contentType: string;
}

interface GetUploadUrlResponse {
  signedUrl: string;
  key: string;
  name: string;
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

interface UploadFileResponse {
  key: string;
  name: string;
}

export async function uploadFile(
  payload: UploadFileRequest
): Promise<UploadFileResponse> {
  const { file } = payload;
  const { signedUrl, key, name } = await getUploadUrl({
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
  return { key, name };
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

interface GetTokensResponse {
 tokens: {  access_token: string;
  refresh_token: string;
  expiry_date: number;
  id_token: string;
  token_type: string;
  scope: string;
 },
 user: User;
}

export async function getTokens(code: string): Promise<GetTokensResponse> {
  const response = await apiClient.post("/auth/google", { code });
  return response.data;
}

interface GetRefreshedTokensResponse extends GetTokensResponse {}

export async function getRefreshedTokens(
  refreshToken: string
): Promise<GetRefreshedTokensResponse> {
  const response = await apiClient.post("/auth/google/refresh-token", {
    refreshToken,
  });
  return response.data;
}
