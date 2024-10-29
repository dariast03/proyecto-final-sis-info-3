import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Evento, EventoWithoutId } from "../data/schema";
import eventoService from "../services/evento-service";
import { UpdateDocument } from "@/modules/shared/types/update-document";
import { getError } from "@/lib/get-error";


export const useEventoCreate = () => {
  const client = useQueryClient();

  const eventoCreateMutation = useMutation({
    mutationFn: (data: EventoWithoutId) =>
      toast.promise(eventoService.create(data), {
        loading: "Creando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario creada exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["eventos"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return eventoCreateMutation
};

export const useEventoUpdate = () => {
  const client = useQueryClient();

  const eventoUpdateMutation = useMutation({
    mutationFn: (data: UpdateDocument<Evento>) =>
      toast.promise(eventoService.update(data), {
        loading: "Actualizando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario actualizado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["eventos"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return eventoUpdateMutation
};

export const useEventoDelete = () => {
  const client = useQueryClient();

  const eventoDeleteMutation = useMutation({
    mutationFn: (id: number) =>
      toast.promise(eventoService.remove(id), {
        loading: "Eliminando usuario..",
        error: (e) => getError(e).msg,
        success: "Usuario  eliminado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["eventos"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return eventoDeleteMutation
};