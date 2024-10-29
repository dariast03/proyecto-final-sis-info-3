import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import curriculumService from "../services/curriculum-service";
import type { Curriculum } from "../data/schema";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";


type Config = Omit<
  UndefinedInitialDataOptions<Curriculum[]>,
  "queryKey" | "queryFn"
>;

export const useCurriculums = (
  params?: any,
  config?: Config,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["curriculums", params],
    queryFn: async () => {
      const data = await curriculumService.getAll();

      data.forEach((departement) => {
        queryClient.setQueryData(["curriculums", departement.id], departement);
      });

      return data;
    },
    staleTime: 1000 * 60 * 60,
    ...config,
  });
};

export const useCurriculum = (id: string) =>
  useQuery({
    queryKey: ["curriculums", id],
    queryFn: () => curriculumService.getById(id),
    staleTime: 1000 * 60 * 60,
  });

export const useMeCurriculum = () =>
  useQuery({
    queryKey: ["curriculums", 'me'],
    queryFn: () => curriculumService.getMe(),
    staleTime: 1000 * 60 * 60,
  });
