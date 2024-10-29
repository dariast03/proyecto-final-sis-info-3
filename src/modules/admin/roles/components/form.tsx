import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { type Role, type RoleWithoutId, roleSchema } from "../data/schema";

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { useRoleCreate, useRoleUpdate } from "../hooks/use-rol-mutations";

interface RoleFormProps {
  initialData?: Role | RoleWithoutId | null;
}

export const RoleForm: React.FC<RoleFormProps> = ({ initialData }) => {
  const navigate = useNavigate();

  const roleCreateMutation = useRoleCreate();
  const roleUpdateMutation = useRoleUpdate();

  /*   const rolesQuery = useRoles({
    where: [
      {
        field: "idRol",
        operator: "!=",
        value: "t6Ic5KQyjQD8l7jnZ6Wy",
      },
    ],
  }); */
  const roles: any[] = [];
  //rolesQuery.data?.toSorted((a, b) => a.name.localeCompare(b.name)) ?? [];

  const title = initialData ? "Editar rol" : "Crear rol";
  const description = initialData ? "Editar una rol." : "Agregar nueva rol";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData ? initialData : {};

  const form = useForm<Role>({
    resolver: zodResolver(
      roleSchema.omit(initialData && "id" in initialData ? {} : { id: true })
    ),
    defaultValues,
    mode: "all",
  });

  const onSubmit = async (data: Role) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (initialData) {
      await roleUpdateMutation.mutateAsync(data);
    } else {
      await roleCreateMutation.mutateAsync(data);
    }

    navigate("/admin/roles");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nombre del rol"
                    autoComplete="name"
                    value={field.value || ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
