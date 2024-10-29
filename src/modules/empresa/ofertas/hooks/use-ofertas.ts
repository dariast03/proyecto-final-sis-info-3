import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ofertaService from "../services/oferta-service";
import type { Oferta } from "../data/schema";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";


type Config = Omit<
  UndefinedInitialDataOptions<Oferta[]>,
  "queryKey" | "queryFn"
>;

export const useOfertas = (
  params?: any,
  config?: Config,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["ofertas", params],
    queryFn: async () => {
      const data = await ofertaService.getAll();

      data.forEach((departement) => {
        queryClient.setQueryData(["ofertas", departement.id], departement);
      });

      return data;
    },
    staleTime: 1000 * 60 * 60,
    ...config,
  });
};

export const useOferta = (id: string) =>
  useQuery({
    queryKey: ["ofertas", id],
    queryFn: () => ofertaService.getById(id),
    staleTime: 1000 * 60 * 60,
  });
