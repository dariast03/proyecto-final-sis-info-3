import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableToolbarOptions } from "./data-table-toolbar-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useMemo } from "react";
import { Role } from "../../data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const data = table.options.data as Role[];

  const statuses = useMemo(() => {
    const statusesSet = new Set<string>();
    data.forEach((department) => {
      if (department.nombre) statusesSet.add(department.nombre);
    });

    const statuses = Array.from(statusesSet);

    return statuses.map((position) => ({
      label: position,
      value: position,
    }));
  }, [data]);

  return (
    <div className="flex  flex-col  gap-4">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Buscar..."
          onChange={(event) =>
            table.setGlobalFilter(event.target.value || undefined)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      <div className="flex justify-between items-center">
        {table.getColumn("nombre") && (
          <DataTableFacetedFilter
            column={table.getColumn("nombre")}
            title="Estado"
            options={statuses}
          />
        )}
        {/*   {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <DataTableToolbarOptions table={table} />
        </div>
      </div>
    </div>
  );
}