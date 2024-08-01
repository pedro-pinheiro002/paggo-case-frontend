import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExtractedText } from "@/types/types";

interface TextExtractedTableProps {
  extractedText: ExtractedText;
}

export function TextExtracted({ extractedText }: TextExtractedTableProps) {
  return (
    // <Table className="bg-slate-900 text-slate-50 rounded-lg">
    //   <TableHeader>
    //     {header.map((head) => (
    //       <TableHead key={head}>{head}</TableHead>
    //     ))}
    //   </TableHeader>
    //   <TableBody>
    //     {Object.entries(rows).map(([key, row]) => (
    //       <TableRow key={key}>
    //         {row.map((cell) => (
    //           <TableCell key={cell}>{cell}</TableCell>
    //         ))}
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>
    <Card className="bg-slate-900 text-slate-50 border-none">
      <CardHeader className="text-2xl text-slate-400">Conteúdo do Arquivo</CardHeader>
      <CardContent>
        {extractedText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </CardContent>
    </Card>
  );
}
