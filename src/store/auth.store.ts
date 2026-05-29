import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUser, Role, ROLE_ROUTES } from "@/types/auth.types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string, refreshToken: string) => void;
  setToken: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
  getDashboardRoute: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken, isAuthenticated: true }),

      setToken: (token, refreshToken) =>
        set({ token, refreshToken }),

      clearAuth: () =>
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),

      getDashboardRoute: () => {
        const role = get().user?.role;
        if (!role) return "/login/hospital";
        return ROLE_ROUTES[role as Role] || "/login/hospital";
      },
    }),
    {
      name: "hms-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
