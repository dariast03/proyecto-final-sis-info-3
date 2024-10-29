import type { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type DatatableSkeletonProps<TData, TValue> = {
  rows?: number;
  columns: ColumnDef<TData, TValue>[];
};

const DatatableSkeleton: React.FC<DatatableSkeletonProps<any, any>> = ({
  rows = 10,
  columns,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, i) => {
              return (
                <TableHead key={`${column.id}${i}`}>
                  <Skeleton className="w-full h-5" />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((r, i) => (
            <TableRow key={`row-${i}`}>
              {columns.map((column, j) => {
                return (
                  <TableCell key={`${column.id}-${i}-${j + 1}`}>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default DatatableSkeleton;
