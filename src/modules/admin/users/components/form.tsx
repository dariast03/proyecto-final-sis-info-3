import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { type User, type UserWithoutId, userSchema } from "../data/schema";

import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useUserCreate, useUserUpdate } from "../hooks/use-user-mutations";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { PasswordInput } from "@/components/ui/password-input";
import { useRoles } from "../../roles/hooks/use-roles";
//import { useUsers } from "@/modules/users/hooks/use-users";

interface UserFormProps {
  initialData?: User | UserWithoutId | null;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const navigate = useNavigate();

  const userCreateMutation = useUserCreate();
  const userUpdateMutation = useUserUpdate();

  const rolesQuery = useRoles();

  const roles =
    rolesQuery.data?.toSorted((a, b) => a.nombre.localeCompare(b.nombre)) ?? [];

  const title = initialData ? "Editar usuario" : "Crear usuario";
  const description = initialData
    ? "Editar una usuario."
    : "Agregar nueva usuario";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData ? initialData : {};

  const form = useForm<User>({
    resolver: zodResolver(
      userSchema.omit(initialData && "id" in initialData ? {} : { id: true })
    ),
    defaultValues,
    mode: "all",
  });

  const onSubmit = async (data: User) => {
    if (initialData) {
      await userUpdateMutation.mutateAsync(data);
    } else {
      await userCreateMutation.mutateAsync(data);
    }

    navigate("/admin/users");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nombre del usuario"
                        autoComplete="name"
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Apellido del usuario"
                        type=""
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Correo del usuario"
                    type=""
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contrasena"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contrasena</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="******"
                    autoComplete="current-password"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <AutosizeTextarea
                    {...field}
                    placeholder="Direccion del usuario"
                    value={field.value || ""}
                    maxHeight={150}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Telefono</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="Telefono del usuario"
                    {...field}
                    defaultCountry="BO"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idRol"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Rol</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          " justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? roles?.find((rol) => rol.id === field.value)?.nombre
                          : "Selecciona un rol"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar..." />
                      <CommandEmpty>No hay resultados</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {roles.map((rol) => (
                            <CommandItem
                              value={rol.nombre}
                              key={rol.id}
                              onSelect={() => {
                                form.setValue("idRol", rol.id || 0);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  rol.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {rol.nombre}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
