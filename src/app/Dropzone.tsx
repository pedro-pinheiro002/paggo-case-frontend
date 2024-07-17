import { FileUp } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (files: File[]) => void;
}

export function Dropzone({ onDrop }: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
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
  );
}
