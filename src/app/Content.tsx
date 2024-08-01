"use client";
import { ExtractButton } from "./ExtractButton";
import { TextExtracted } from "./TextExtracted";
import { Dropzone } from "./Dropzone";
import { useContent } from "@/hooks/useContent";
import { Profile } from "./Profile";
import { useAuthContext } from "@/hooks/useAuthContext";

export function Content() {
  const { user, isAuthenticated, handleLogOut } = useAuthContext();
  const { setExtractedText, extractedText, fileKey, fileName, onDrop } =
    useContent(isAuthenticated);
  if (!user) return <h1>Erro no Log In!</h1>;

  return (
    <div>
      <Profile user={user} handleLogOut={handleLogOut} />
      <div className="flex flex-col items-center space-y-6 focus:outline-none">
        <Dropzone onDrop={onDrop} />
        <div className="flex flex-col items-center space-y-4">
          <div className="text-slate-400">
            Arquivo upado: {fileName ?? "Nenhum arquivo"}
          </div>
          <ExtractButton
            fileKey={fileKey}
            setExtractedText={setExtractedText}
          />
        </div>
        {extractedText && <TextExtracted extractedText={extractedText} />}
      </div>
    </div>
  );
}
