import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Cuota, CuotaWithoutId } from "../data/schema";
import cuotaService from "../services/cuota-service";
import { UpdateDocument } from "@/modules/shared/types/update-document";
import { getError } from "@/lib/get-error";


export const useCuotaCreate = () => {
  const client = useQueryClient();

  const cuotaCreateMutation = useMutation({
    mutationFn: (data: CuotaWithoutId) =>
      toast.promise(cuotaService.create(data), {
        loading: "Creando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario creada exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["cuotas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return cuotaCreateMutation
};

export const useCuotaUpdate = () => {
  const client = useQueryClient();

  const cuotaUpdateMutation = useMutation({
    mutationFn: (data: UpdateDocument<Cuota>) =>
      toast.promise(cuotaService.update(data), {
        loading: "Actualizando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario actualizado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["cuotas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return cuotaUpdateMutation
};

export const useCuotaDelete = () => {
  const client = useQueryClient();

  const cuotaDeleteMutation = useMutation({
    mutationFn: (id: number) =>
      toast.promise(cuotaService.remove(id), {
        loading: "Eliminando usuario..",
        error: (e) => getError(e).msg,
        success: "Usuario  eliminado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["cuotas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return cuotaDeleteMutation
};