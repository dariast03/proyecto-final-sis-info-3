import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Oferta, OfertaWithoutId } from "../data/schema";
import ofertaService from "../services/oferta-service";
import { UpdateDocument } from "@/modules/shared/types/update-document";
import { getError } from "@/lib/get-error";


export const useOfertaCreate = () => {
  const client = useQueryClient();

  const ofertaCreateMutation = useMutation({
    mutationFn: (data: OfertaWithoutId) =>
      toast.promise(ofertaService.create(data), {
        loading: "Creando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario creada exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["ofertas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return ofertaCreateMutation
};

export const useOfertaUpdate = () => {
  const client = useQueryClient();

  const ofertaUpdateMutation = useMutation({
    mutationFn: (data: UpdateDocument<Oferta>) =>
      toast.promise(ofertaService.update(data), {
        loading: "Actualizando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario actualizado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["ofertas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return ofertaUpdateMutation
};

export const useOfertaDelete = () => {
  const client = useQueryClient();

  const ofertaDeleteMutation = useMutation({
    mutationFn: (id: number) =>
      toast.promise(ofertaService.remove(id), {
        loading: "Eliminando usuario..",
        error: (e) => getError(e).msg,
        success: "Usuario  eliminado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["ofertas"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return ofertaDeleteMutation
};