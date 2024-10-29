import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import propuestaService from "../services/propuesta-service";
import type { Propuesta } from "../data/schema";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";


type Config = Omit<
  UndefinedInitialDataOptions<Propuesta[]>,
  "queryKey" | "queryFn"
>;

export const usePropuestas = (
  params?: any,
  config?: Config,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["propuestas", params],
    queryFn: async () => {
      const data = await propuestaService.getAll();

      data.forEach((departement) => {
        queryClient.setQueryData(["propuestas", departement.id], departement);
      });

      return data;
    },
    staleTime: 1000 * 60 * 60,
    ...config,
  });
};

export const usePropuesta = (id: string) =>
  useQuery({
    queryKey: ["propuestas", id],
    queryFn: () => propuestaService.getById(id),
    staleTime: 1000 * 60 * 60,
  });
