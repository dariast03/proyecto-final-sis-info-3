import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import eventoService from "../services/evento-service";
import type { Evento } from "../data/schema";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";


type Config = Omit<
  UndefinedInitialDataOptions<Evento[]>,
  "queryKey" | "queryFn"
>;

export const useEventos = (
  params?: any,
  config?: Config,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["eventos", params],
    queryFn: async () => {
      const data = await eventoService.getAll();

      data.forEach((departement) => {
        queryClient.setQueryData(["eventos", departement.id], departement);
      });

      return data;
    },
    staleTime: 1000 * 60 * 60,
    ...config,
  });
};

export const useEvento = (id: string) =>
  useQuery({
    queryKey: ["eventos", id],
    queryFn: () => eventoService.getById(id),
    staleTime: 1000 * 60 * 60,
  });
