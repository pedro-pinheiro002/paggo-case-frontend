"use client";
import { extractText, uploadFile } from "@/http/api";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function UploadCard() {
  const [fileKey, setFileKey] = useState<string | null>(null);
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
        className="flex flex-col items-center py-16 px-52 justify-center text-slate-50 bg-slate-800 rounded-lg"
      >
        <input {...getInputProps()}></input>
        Drag and drop your files here
      </div>
      <button
        onClick={() => {
          if (fileKey) {
            extractText({ objectKey: fileKey }).then((response) => {
              console.log(response);
            });
          }
        }}
        className="bg-slate-800 text-slate-50 py-2 px-4 rounded-lg"
      >
        Extrair texto
      </button>
    </div>
  );
}
