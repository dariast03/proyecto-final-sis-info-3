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
  type Evento,
  type EventoWithoutId,
  eventoSchema,
} from "../data/schema";

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import {
  useEventoCreate,
  useEventoUpdate,
} from "../hooks/use-evento-mutations";
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

interface EventoFormProps {
  initialData?: Evento | EventoWithoutId | null;
}

export const EventoForm: React.FC<EventoFormProps> = ({ initialData }) => {
  const navigate = useNavigate();

  const eventoCreateMutation = useEventoCreate();
  const eventoUpdateMutation = useEventoUpdate();

  /*   const eventosQuery = useEventos({
    where: [
      {
        field: "idRol",
        operator: "!=",
        value: "t6Ic5KQyjQD8l7jnZ6Wy",
      },
    ],
  }); */
  const eventos: any[] = [];
  //eventosQuery.data?.toSorted((a, b) => a.name.localeCompare(b.name)) ?? [];

  const title = initialData ? "Editar evento" : "Crear evento";
  const description = initialData
    ? "Editar una evento."
    : "Agregar nueva evento";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData ? initialData : {};

  const form = useForm<Evento>({
    resolver: zodResolver(
      eventoSchema.omit(initialData && "id" in initialData ? {} : { id: true })
    ),
    defaultValues,
    mode: "all",
  });

  const onSubmit = async (data: Evento) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (initialData) {
      await eventoUpdateMutation.mutateAsync(data);
    } else {
      await eventoCreateMutation.mutateAsync(data);
    }

    navigate("/asociado/eventos");
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
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="titulo" type="" {...field} />
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
            name="fechaEvento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha Evento</FormLabel>
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

          <FormField
            control={form.control}
            name="lugar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lugar</FormLabel>
                <FormControl>
                  <Input placeholder="lugar" type="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
