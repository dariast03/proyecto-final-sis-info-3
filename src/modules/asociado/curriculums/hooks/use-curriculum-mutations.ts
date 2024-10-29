import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Curriculum, CurriculumWithoutId } from "../data/schema";
import curriculumService from "../services/curriculum-service";
import { UpdateDocument } from "@/modules/shared/types/update-document";
import { getError } from "@/lib/get-error";


export const useCurriculumCreate = () => {
  const client = useQueryClient();

  const curriculumCreateMutation = useMutation({
    mutationFn: (data: CurriculumWithoutId) =>
      toast.promise(curriculumService.create(data), {
        loading: "Creando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario creada exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["curriculums"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return curriculumCreateMutation
};

export const useCurriculumUpdate = () => {
  const client = useQueryClient();

  const curriculumUpdateMutation = useMutation({
    mutationFn: (data: UpdateDocument<Curriculum>) =>
      toast.promise(curriculumService.update(data), {
        loading: "Actualizando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario actualizado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["curriculums"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return curriculumUpdateMutation
};

export const useCurriculumDelete = () => {
  const client = useQueryClient();

  const curriculumDeleteMutation = useMutation({
    mutationFn: (id: number) =>
      toast.promise(curriculumService.remove(id), {
        loading: "Eliminando usuario..",
        error: (e) => getError(e).msg,
        success: "Usuario  eliminado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["curriculums"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return curriculumDeleteMutation
};