import { toast } from "react-hot-toast";
import authService from "../services/auth-service";
import { useAuthStore } from "@/store/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import type { LoginForm } from "../data/schema";
import { getError } from "@/lib/get-error";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const authStore = useAuthStore();
  const { signIn, signOut, setStatus } = authStore;


  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await authService.login(data);
      signIn(response);
      toast.success("Sesión iniciada con éxito");
      return response;
    },
    onSuccess: () => {
      setStatus("authenticated");
      //  navigate("/home");
    },
    onError: (e: any) => {
      toast.error(getError(e)?.msg ?? "Error al iniciar sesión");
      setStatus("no-authenticated");
      throw e;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      signOut();
      toast.success("Sesión cerrada con éxito");
    },
    onError: (e: any) => {
      toast.error(getError(e)?.msg ?? "Error al cerrar sesión");
      throw e;
    },
  });

  return {
    ...authStore,
    loginMutation,
    logoutMutation,
  };
};
