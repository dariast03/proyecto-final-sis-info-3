import { type StateCreator, create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";


type State = {
  selectedPlan: string;
};

type Actions = {
  setSelectedPlan: (plan: string) => void;
};

const initialStore: State = {
  selectedPlan: "",
};

const storeData: StateCreator<State & Actions> = (set) => ({
  ...initialStore,
  setSelectedPlan: (selectedPlan) =>
    set((state) => ({ ...state, selectedPlan })),

});

export const useAppStore = create(storeData);

mountStoreDevtool("app-store", useAppStore);
