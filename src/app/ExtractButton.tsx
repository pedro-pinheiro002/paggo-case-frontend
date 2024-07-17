import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { extractText, importExtractedText } from "@/http/api";
import { ExtractedText } from "@/types/types";
import { toast } from "sonner";

interface ExtractButtonProps {
  fileKey: string | null;
  setExtractedText: React.Dispatch<React.SetStateAction<ExtractedText | null>>;
}

export function ExtractButton({
  fileKey,
  setExtractedText,
}: ExtractButtonProps) {
  function handleExtractText() {
    if (!fileKey) return;
    extractText({ objectKey: fileKey })
      .then((response) => {
        toast.success("Texto extraído com sucesso!");
        importExtractedText({
          objectKey: fileKey,
        })
          .then((response) => {
            toast.success("Texto importado com sucesso!");
            setExtractedText(response);
            console.log(response);
          })
          .catch((error) => {
            toast.error("Erro ao importar texto");
            console.error("Error importing text", error);
          });
        console.log(response);
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
            disabled={!fileKey}
            onClick={handleExtractText}
          >
            Extrair texto
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>
          Extraia o texto do arquivo para visualizar
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
