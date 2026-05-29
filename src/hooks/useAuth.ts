"use client";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import authService from "@/services/auth.service";
import Cookies from "js-cookie";

export function useAuth() {
  const { user, token, refreshToken, isAuthenticated, setAuth, clearAuth, getDashboardRoute } = useAuthStore();
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      if (refreshToken) await authService.logout(refreshToken);
    } catch {}
    clearAuth();
    Cookies.remove("hms-token");
    Cookies.remove("hms-role");
    router.push("/login/hospital");
  }, [refreshToken, clearAuth, router]);

  const loginSuccess = useCallback(
    (tokenResponse: { token: string; refreshToken: string; user: typeof user }) => {
      if (!tokenResponse.user) return;
      setAuth(tokenResponse.user, tokenResponse.token, tokenResponse.refreshToken);
      Cookies.set("hms-token", tokenResponse.token, { expires: 1 });
      Cookies.set("hms-role", tokenResponse.user.role, { expires: 1 });
    },
    [setAuth]
  );

  return { user, token, isAuthenticated, logout, loginSuccess, getDashboardRoute };
}
