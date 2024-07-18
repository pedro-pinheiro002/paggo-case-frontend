"use client";
import { uploadFile } from "@/http/api";
import { useCallback, useState } from "react";
import { ExtractButton } from "./ExtractButton";
import { TextExtractedTable } from "./TextExtractedTable";
import { ExtractedText } from "@/types/types";
import { Dropzone } from "./Dropzone";
import { useContent } from "@/hooks/useContent";

export function Content() {
  const { setExtractedText, extractedText, fileKey, fileName, onDrop } =
    useContent();

  return (
    <div className="flex flex-col items-center space-y-6 focus:outline-none">
      <Dropzone onDrop={onDrop} />
      <div className="flex flex-col items-center space-y-4">
        <div className="text-slate-400">
          Arquivo upado: {fileName ?? "Nenhum arquivo"}
        </div>
        <ExtractButton fileKey={fileKey} setExtractedText={setExtractedText} />
      </div>
      {extractedText && <TextExtractedTable extractedText={extractedText} />}
    </div>
  );
}
