import { create } from "zustand";
import { checkAuth, logout } from "../services/authService";

interface AuthState {
  isAuthenticated?: boolean;
  checkAuth: () => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: undefined,
  checkAuth: async () => {
    try {
      await checkAuth();
      set({ isAuthenticated: true });
      return true;
    } catch {
      set({ isAuthenticated: false });
      return false;
    }
  },
  logout: async () => {
    await logout();
    set({ isAuthenticated: false });
  },
}));
