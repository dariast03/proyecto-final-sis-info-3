import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import roleService from "../services/role-service";
import type { Role } from "../data/schema";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";


type Config = Omit<
  UndefinedInitialDataOptions<Role[]>,
  "queryKey" | "queryFn"
>;

export const useRoles = (
  params?: any,
  config?: Config,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["roles", params],
    queryFn: async () => {
      const data = await roleService.getAll();

      data.forEach((departement) => {
        queryClient.setQueryData(["roles", departement.id], departement);
      });

      return data;
    },
    staleTime: 1000 * 60 * 60,
    ...config,
  });
};

export const useRole = (id: string) =>
  useQuery({
    queryKey: ["roles", id],
    queryFn: () => roleService.getById(id),
    staleTime: 1000 * 60 * 60,
  });
