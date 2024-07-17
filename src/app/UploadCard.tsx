"use client";
import { Button } from "@/components/ui/button";
import { extractText, uploadFile } from "@/http/api";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { FileUp } from "lucide-react";
import { ExtractButton } from "./ExtractButton";
import { TextExtractedTable } from "./TextExtractedTable";
import { ExtractedText } from "@/types/types";

export function UploadCard() {
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<ExtractedText | null>(
    null
  );
  console.log("extractedtext", extractedText);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    const fileKey = await uploadFile({ file });
    setFileKey(fileKey);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center space-y-6 focus:outline-none">
      <div
        {...getRootProps()}
        className="flex  items-center py-16 px-52 justify-center text-slate-50 bg-slate-800 rounded-lg"
      >
        <input {...getInputProps()}></input>
        <div className="flex items-center">
          <FileUp size={64} />
          Drag and drop your files here
        </div>
      </div>
      <ExtractButton fileKey={fileKey} setExtractedText={setExtractedText} />
      {extractedText && <TextExtractedTable extractedText={extractedText} />}
    </div>
  );
}
