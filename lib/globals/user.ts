import { create } from "zustand";

type UserStore = {
  uid: string | null;
  setUID: (uid: string | null) => void;
  user: any;
  setUser: (user: any) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  uid: null,
  setUID: (uid) => set({ uid }),
  user: null,
  setUser: (user) => set({ user }),
}));
