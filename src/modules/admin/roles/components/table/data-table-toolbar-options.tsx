import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { File, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { links } from "../../data/data";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbarOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <>
      {/*       <Button variant="outline" size="sm" className="h-8 gap-1">
        <ListFilter className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Filtrar
        </span>
      </Button> */}

      <Button size="sm" variant="outline" className="h-8 gap-1">
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Exportar
        </span>
      </Button>

      <Link to={links.create}>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Nuevo
          </span>
        </Button>
      </Link>
    </>
  );
}
