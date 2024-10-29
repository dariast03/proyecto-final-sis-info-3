import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import userService from "../services/user-service";
import type { User } from "../data/schema";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";


type Config = Omit<
  UndefinedInitialDataOptions<User[]>,
  "queryKey" | "queryFn"
>;

export const useUsers = (
  params?: any,
  config?: Config,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const data = await userService.getAll();

      data.forEach((departement) => {
        queryClient.setQueryData(["users", departement.id], departement);
      });

      return data;
    },
    staleTime: 1000 * 60 * 60,
    ...config,
  });
};

export const useUser = (id: string) =>
  useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getById(id),
    staleTime: 1000 * 60 * 60,
  });
