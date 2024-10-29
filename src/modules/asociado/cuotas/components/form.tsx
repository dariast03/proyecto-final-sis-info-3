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
import { type Cuota, type CuotaWithoutId, cuotaSchema } from "../data/schema";

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { useCuotaCreate, useCuotaUpdate } from "../hooks/use-cuota-mutations";

interface CuotaFormProps {
  initialData?: Cuota | CuotaWithoutId | null;
}

export const CuotaForm: React.FC<CuotaFormProps> = ({ initialData }) => {
  const navigate = useNavigate();

  const cuotaCreateMutation = useCuotaCreate();
  const cuotaUpdateMutation = useCuotaUpdate();

  /*   const cuotasQuery = useCuotas({
    where: [
      {
        field: "idRol",
        operator: "!=",
        value: "t6Ic5KQyjQD8l7jnZ6Wy",
      },
    ],
  }); */
  const cuotas: any[] = [];
  //cuotasQuery.data?.toSorted((a, b) => a.name.localeCompare(b.name)) ?? [];

  const title = initialData ? "Editar cuota" : "Crear cuota";
  const description = initialData ? "Editar una cuota." : "Agregar nueva cuota";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData ? initialData : {};

  const form = useForm<Cuota>({
    resolver: zodResolver(
      cuotaSchema.omit(initialData && "id" in initialData ? {} : { id: true })
    ),
    defaultValues,
    mode: "all",
  });

  const onSubmit = async (data: Cuota) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (initialData) {
      await cuotaUpdateMutation.mutateAsync(data);
    } else {
      await cuotaCreateMutation.mutateAsync(data);
    }

    navigate("/asociado/cuotas");
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
            name="monto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Monto a cancelar"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>

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
