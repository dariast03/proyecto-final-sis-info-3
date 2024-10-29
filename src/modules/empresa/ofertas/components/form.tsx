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
import {
  type Oferta,
  type OfertaWithoutId,
  ofertaSchema,
} from "../data/schema";

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import {
  useOfertaCreate,
  useOfertaUpdate,
} from "../hooks/use-oferta-mutations";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface OfertaFormProps {
  initialData?: Oferta | OfertaWithoutId | null;
}

export const OfertaForm: React.FC<OfertaFormProps> = ({ initialData }) => {
  const navigate = useNavigate();

  const ofertaCreateMutation = useOfertaCreate();
  const ofertaUpdateMutation = useOfertaUpdate();

  /*   const ofertasQuery = useOfertas({
    where: [
      {
        field: "idRol",
        operator: "!=",
        value: "t6Ic5KQyjQD8l7jnZ6Wy",
      },
    ],
  }); */
  const ofertas: any[] = [];
  //ofertasQuery.data?.toSorted((a, b) => a.name.localeCompare(b.name)) ?? [];

  const title = initialData ? "Editar oferta" : "Crear oferta";
  const description = initialData
    ? "Editar una oferta."
    : "Agregar nueva oferta";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData ? initialData : {};

  const form = useForm<Oferta>({
    resolver: zodResolver(
      ofertaSchema.omit(initialData && "id" in initialData ? {} : { id: true })
    ),
    defaultValues,
    mode: "all",
  });

  const onSubmit = async (data: Oferta) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (initialData) {
      await ofertaUpdateMutation.mutateAsync(data);
    } else {
      await ofertaCreateMutation.mutateAsync(data);
    }

    navigate("/empresa/ofertas");
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
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="tituempresalo"
                    type="text"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="descripcion"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaVencimiento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha Vencimiento Oferta</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Elige una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit">{action}</Button>
        </form>
      </Form>
    </>
  );
};
