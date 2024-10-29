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
  type Curriculum,
  type CurriculumWithoutId,
  curriculumSchema,
} from "../data/schema";

import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import {
  useCurriculumCreate,
  useCurriculumUpdate,
} from "../hooks/use-curriculum-mutations";

interface CurriculumFormProps {
  initialData?: Curriculum | CurriculumWithoutId | null;
}

export const CurriculumForm: React.FC<CurriculumFormProps> = ({
  initialData,
}) => {
  const navigate = useNavigate();

  const curriculumCreateMutation = useCurriculumCreate();
  const curriculumUpdateMutation = useCurriculumUpdate();

  /*   const curriculumsQuery = useCurriculums({
    where: [
      {
        field: "idRol",
        operator: "!=",
        value: "t6Ic5KQyjQD8l7jnZ6Wy",
      },
    ],
  }); */
  const curriculums: any[] = [];
  //curriculumsQuery.data?.toSorted((a, b) => a.name.localeCompare(b.name)) ?? [];

  const title = initialData ? "Editar curriculum" : "Crear curriculum";
  const description = initialData
    ? "Editar una curriculum."
    : "Agregar nueva curriculum";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const defaultValues = initialData ? initialData : {};

  const form = useForm<Curriculum>({
    resolver: zodResolver(
      curriculumSchema.omit(
        initialData && "id" in initialData ? {} : { id: true }
      )
    ),
    defaultValues,
    mode: "all",
  });

  const onSubmit = async (data: Curriculum) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (initialData) {
      await curriculumUpdateMutation.mutateAsync(data);
    } else {
      await curriculumCreateMutation.mutateAsync(data);
    }

    navigate("/asociado/curriculums");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/*    <FormField
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
          /> */}

          <Button className="w-full" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
