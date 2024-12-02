import { create } from "zustand";

type Store = {
  address: string;
  setAddress: (address: string) => void;
  userActivities: string;
  setUserActivities: (userActivities: string) => void;
};

type InitialState = Pick<Store, "address">;

const initialState: InitialState = {
  address: "",
};

const useGlobalStorage = create<Store>((set) => ({
  address: initialState.address,
  setAddress: (address: string) => set({ address }),
  userActivities: "",
  setUserActivities: (userActivities: string) => set({ userActivities }),
}));

export default useGlobalStorage;
