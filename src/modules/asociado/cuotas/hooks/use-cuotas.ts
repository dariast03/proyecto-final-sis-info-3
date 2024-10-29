import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import cuotaService from "../services/cuota-service";
import type { Cuota } from "../data/schema";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";


type Config = Omit<
  UndefinedInitialDataOptions<Cuota[]>,
  "queryKey" | "queryFn"
>;

export const useCuotas = (
  params?: any,
  config?: Config,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["cuotas", params],
    queryFn: async () => {
      const data = await cuotaService.getAll();

      data.forEach((departement) => {
        queryClient.setQueryData(["cuotas", departement.id], departement);
      });

      return data;
    },
    staleTime: 1000 * 60 * 60,
    ...config,
  });
};

export const useCuota = (id: string) =>
  useQuery({
    queryKey: ["cuotas", id],
    queryFn: () => cuotaService.getById(id),
    staleTime: 1000 * 60 * 60,
  });
