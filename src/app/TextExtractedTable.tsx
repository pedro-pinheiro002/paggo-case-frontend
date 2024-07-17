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

export function TextExtractedTable({ extractedText }: TextExtractedTableProps) {
  const { header, ...rows } = extractedText.table;
  return (
    <Table className="bg-slate-900 text-slate-50 rounded-lg">
      <TableHeader>
        {header.map((head) => (
          <TableHead>{head}</TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {Object.entries(rows).map(([key, row]) => (
          <TableRow>
            {row.map((cell, index) => (
              <TableCell>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
