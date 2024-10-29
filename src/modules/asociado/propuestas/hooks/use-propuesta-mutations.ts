import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Propuesta, PropuestaWithoutId } from "../data/schema";
import propuestaService from "../services/propuesta-service";
import { UpdateDocument } from "@/modules/shared/types/update-document";
import { getError } from "@/lib/get-error";


export const usePropuestaCreate = () => {
  const client = useQueryClient();

  const propuestaCreateMutation = useMutation({
    mutationFn: (data: PropuestaWithoutId) =>
      toast.promise(propuestaService.create(data), {
        loading: "Creando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario creada exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["propuestas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return propuestaCreateMutation
};

export const usePropuestaUpdate = () => {
  const client = useQueryClient();

  const propuestaUpdateMutation = useMutation({
    mutationFn: (data: UpdateDocument<Propuesta>) =>
      toast.promise(propuestaService.update(data), {
        loading: "Actualizando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario actualizado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["propuestas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return propuestaUpdateMutation
};

export const usePropuestaDelete = () => {
  const client = useQueryClient();

  const propuestaDeleteMutation = useMutation({
    mutationFn: (id: number) =>
      toast.promise(propuestaService.remove(id), {
        loading: "Eliminando usuario..",
        error: (e) => getError(e).msg,
        success: "Usuario  eliminado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["propuestas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return propuestaDeleteMutation
};