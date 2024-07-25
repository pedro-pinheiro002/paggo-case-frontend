import { getLastExtractedText, uploadFile } from "@/http/api";
import { ExtractedText } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export function useContent(isAuthenticated: boolean) {
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<ExtractedText | null>(
    null
  );
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const { key: fileKey, name: fileName } = await uploadFile({ file });
    setFileName(fileName);
    setFileKey(fileKey);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    getLastExtractedText().then((data) => {
      setExtractedText(data);
    });
  }, [isAuthenticated]);
  
  return { fileKey, fileName, extractedText, onDrop, setExtractedText };
}
