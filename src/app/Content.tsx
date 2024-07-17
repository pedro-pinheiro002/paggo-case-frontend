"use client";
import { uploadFile } from "@/http/api";
import { useCallback, useState } from "react";
import { ExtractButton } from "./ExtractButton";
import { TextExtractedTable } from "./TextExtractedTable";
import { ExtractedText } from "@/types/types";
import { Dropzone } from "./Dropzone";

export function Content() {
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<ExtractedText | null>(
    null
  );
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const fileKey = await uploadFile({ file });
    setFileKey(fileKey);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 focus:outline-none">
      <Dropzone onDrop={onDrop} />
      <ExtractButton fileKey={fileKey} setExtractedText={setExtractedText} />
      {extractedText && <TextExtractedTable extractedText={extractedText} />}
    </div>
  );
}
