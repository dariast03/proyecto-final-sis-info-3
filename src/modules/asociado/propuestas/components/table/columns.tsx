import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Propuesta } from "../../data/schema";

export const columns: ColumnDef<Propuesta>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  /*   {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <CopyId row={row} />,
  }, */
  {
    accessorKey: "oferta-empresa",
    accessorFn: (row) => row.oferta?.empresa ?? "",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 max-w-xs">
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("oferta-empresa") || "N/A"}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "oferta-empleo",
    accessorFn: (row) => row.oferta?.descripcion ?? "",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empleo" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 max-w-xs">
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("oferta-empleo") || "N/A"}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "fechaPropuesta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Propuesta" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 max-w-xs">
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {new Date(row.getValue("fechaPropuesta")).toLocaleDateString() ||
            "N/A"}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "estado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 max-w-xs">
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("estado") || "N/A"}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
