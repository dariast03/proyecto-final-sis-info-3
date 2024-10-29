import { useAuthStore } from "@/store/use-auth-store";

export const isAuth = () => {
  const state = useAuthStore.getState().status === "authenticated";
  console.log("🚀 ~ isAuth ~ state:", state);
  return state;
};
