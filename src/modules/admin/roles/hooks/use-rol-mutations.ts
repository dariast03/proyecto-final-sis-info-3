import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Role, RoleWithoutId } from "../data/schema";
import roleService from "../services/role-service";
import { UpdateDocument } from "@/modules/shared/types/update-document";
import { getError } from "@/lib/get-error";


export const useRoleCreate = () => {
  const client = useQueryClient();

  const roleCreateMutation = useMutation({
    mutationFn: (data: RoleWithoutId) =>
      toast.promise(roleService.create(data), {
        loading: "Creando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario creada exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return roleCreateMutation
};

export const useRoleUpdate = () => {
  const client = useQueryClient();

  const roleUpdateMutation = useMutation({
    mutationFn: (data: UpdateDocument<Role>) =>
      toast.promise(roleService.update(data), {
        loading: "Actualizando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario actualizado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return roleUpdateMutation
};

export const useRoleDelete = () => {
  const client = useQueryClient();

  const roleDeleteMutation = useMutation({
    mutationFn: (id: number) =>
      toast.promise(roleService.remove(id), {
        loading: "Eliminando usuario..",
        error: (e) => getError(e).msg,
        success: "Usuario  eliminado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return roleDeleteMutation
};