import { type StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { UserAuth } from "@/modules/auth/data/schema";
import { User } from "@/modules/admin/users/data/schema";

export type StatusType =
  | "pending"
  | "no-authenticated"
  | "authenticated"
  | "in progress";

type State = {
  status: StatusType;
  user: User;
  token?: string;
};

type Actions = {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  signIn: (data: UserAuth) => void;
  signOut: () => void;
  setStatus: (status: StatusType) => void;
  getIsAdmin: () => boolean;
};

const initialStore: State = {
  status: localStorage.getItem("session") ? "pending" : "no-authenticated",
  user: {} as User,
};

const storeData: StateCreator<State & Actions> = (set, get, state) => ({
  ...initialStore,
  setToken: (token) => set((state) => ({ ...state, token })),
  setUser: (user) => set((state) => ({ ...state, user })),
  signIn: (data) =>
    set(() => {
      localStorage.setItem("session", "active");
      return {
        status: "authenticated",
        user: data.usuario,
        token: data.token,
      };
    }),
  signOut: () => {
    localStorage.removeItem("session");

    return set(() => ({
      ...initialStore,
      token: undefined,
      status: "no-authenticated",
    }));
  },
  setStatus: (status) => set((state) => ({ ...state, status })),
  getIsAdmin: () => !!state.getState().user.idRol,
});

export const useAuthStore = create(
  persist(storeData, {
    name: "auth-store",
    storage: createJSONStorage(() => localStorage)
  })
);

mountStoreDevtool("auth-store", useAuthStore);
