import { create } from "zustand";
import { IUser } from "../types/User";

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
}));

export { useUserStore };
