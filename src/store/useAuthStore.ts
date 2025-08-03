import { create } from "zustand";
import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";

type AuthState = {
  user: DisplayUserDto | null;
  isAdmin: boolean;
  login: (user: DisplayUserDto) => void;
  logout: () => void;
  update: (partial: Partial<DisplayUserDto>) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  login: (user) => set({ user, isAdmin: user.role == "admin" }),
  logout: () => set({ user: null, isAdmin: false }),
  update: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : state.user,
    })),
}));
