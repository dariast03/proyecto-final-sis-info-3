import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UserWithoutId } from "../data/schema";
import userService from "../services/user-service";
import { UpdateDocument } from "@/modules/shared/types/update-document";
import { getError } from "@/lib/get-error";


export const useUserCreate = () => {
  const client = useQueryClient();

  const userCreateMutation = useMutation({
    mutationFn: (data: UserWithoutId) =>
      toast.promise(userService.create(data), {
        loading: "Creando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario creada exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return userCreateMutation
};

export const useUserUpdate = () => {
  const client = useQueryClient();

  const userUpdateMutation = useMutation({
    mutationFn: (data: UpdateDocument<User>) =>
      toast.promise(userService.update(data), {
        loading: "Actualizando usuario...",
        error: (e) => getError(e).msg,
        success: "Usuario actualizado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return userUpdateMutation
};

export const useUserDelete = () => {
  const client = useQueryClient();

  const userDeleteMutation = useMutation({
    mutationFn: (id: number) =>
      toast.promise(userService.remove(id), {
        loading: "Eliminando usuario..",
        error: (e) => getError(e).msg,
        success: "Usuario  eliminado exitosamente",
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error: any) => {
      console.log(error);
      return error;
    },
  });

  return userDeleteMutation
};