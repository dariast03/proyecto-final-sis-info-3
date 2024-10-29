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
  type Propuesta,
  type PropuestaWithoutId,
  propuestaSchema,
} from "../data/schema";

import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  usePropuestaCreate,
  usePropuestaUpdate,
} from "../hooks/use-propuesta-mutations";
import { useOfertas } from "@/modules/empresa/ofertas/hooks/use-ofertas";
import { cn } from "@/lib/utils";

interface PropuestaFormProps {
  initialData?: Propuesta | PropuestaWithoutId | null;
}

export const PropuestaForm: React.FC<PropuestaFormProps> = ({
  initialData,
}) => {
  const navigate = useNavigate();

  const propuestaCreateMutation = usePropuestaCreate();
  const propuestaUpdateMutation = usePropuestaUpdate();

  const ofertasQuery = useOfertas();
  const ofertas =
    ofertasQuery.data?.toSorted((a, b) =>
      a.descripcion.localeCompare(b.descripcion)
    ) ?? [];

  const title = initialData ? "Editar propuesta" : "Crear propuesta";
  const description = initialData
    ? "Editar una propuesta."
    : "Agregar nueva propuesta";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData ? initialData : {};

  const form = useForm<Propuesta>({
    resolver: zodResolver(
      propuestaSchema.omit(
        initialData && "id" in initialData ? {} : { id: true }
      )
    ),
    defaultValues,
    mode: "all",
  });

  const ofertaSelect = ofertas.find(
    (oferta) => oferta.id === form.watch("idOferta")
  );

  const onSubmit = async (data: Propuesta) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (initialData) {
      await propuestaUpdateMutation.mutateAsync(data);
    } else {
      await propuestaCreateMutation.mutateAsync(data);
    }

    navigate("/asociado/propuestas");
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
            name="idOferta"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Oferta</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "wfull justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? ofertas.find((oferta) => oferta.id === field.value)
                              ?.descripcion
                          : "Seleccionar una oferta"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar..." />
                      <CommandList>
                        <CommandEmpty>No oferta encontradas.</CommandEmpty>
                        <CommandGroup>
                          {ofertas.map((oferta) => (
                            <CommandItem
                              value={oferta.descripcion}
                              key={oferta.id}
                              onSelect={() => {
                                form.setValue("idOferta", oferta.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  oferta.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {oferta.descripcion}
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

          {/* CARD INFO EMPRESA */}
          {ofertaSelect && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="text-lg font-semibold">
                      {ofertaSelect?.empresa}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ofertaSelect?.descripcion}
                    </div>
                  </div>
                </div>
                <Button variant="outline">Ver perfil</Button>
              </div>

              <p className="font-medium  mt-4">Postulacion abierta hasta</p>

              <p>{ofertaSelect.fechaVencimiento.toLocaleDateString()}</p>

              {ofertaSelect.fechaVencimiento < new Date() && (
                <p className="text-destructive">Ya no puedes postularte</p>
              )}
            </div>
          )}

          <Button
            className="w-full"
            type="submit"
            //@ts-ignore
            disabled={ofertaSelect?.fechaVencimiento < new Date()}
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
