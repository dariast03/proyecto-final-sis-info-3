import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { propuestaSchema } from "../../data/schema";
import { Link } from "react-router-dom";
import { links } from "../../data/data";
import { usePropuestaDelete } from "../../hooks/use-propuesta-mutations";
import { confirm } from "@/modules/shared/components/confirm";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const propuesta = propuestaSchema.parse(row.original);

  const propuestaDeleteMutation = usePropuestaDelete();

  const onDelete = async () => {
    if (
      await confirm({
        description: `¿Estás seguro de eliminar la propuesta ${propuesta.id}?`,
      })
    ) {
      await propuestaDeleteMutation.mutateAsync(propuesta.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link to={`${links.edit}/${propuesta.id}`}>Editar</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onDelete}>
          Eliminar
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
