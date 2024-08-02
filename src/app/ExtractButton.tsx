"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { extractText, importExtractedText } from "@/http/api";
import { ExtractedText } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ExtractButtonProps {
  fileKey: string | null;
  setExtractedText: React.Dispatch<React.SetStateAction<ExtractedText | null>>;
}

export function ExtractButton({
  fileKey,
  setExtractedText,
}: ExtractButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  function handleExtractText() {
    if (!fileKey) return;
    setIsLoading(true);
    extractText({ objectKey: fileKey })
      .then((response) => {
        toast.success("Texto extraído com sucesso!");
        importExtractedText({
          objectKey: fileKey,
        })
          .then((response) => {
            setExtractedText(response);
            setIsLoading(false);
          })
          .catch((error) => {
            toast.error("Erro ao importar texto");
            console.error("Error importing text", error);
          });
      })
      .catch((error) => {
        toast.error("Erro ao extrair texto");
        console.error("Error extracting text", error);
      });
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            disabled={!fileKey || isLoading}
            onClick={handleExtractText}
            className="flex items-center space-x-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin mr-2" />}
            Extrair texto
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>
          Extraia o texto do arquivo para poder fazer a análise
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
