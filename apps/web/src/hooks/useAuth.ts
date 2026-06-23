import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setUser, setLoading } =
    useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      // In a real app with HttpOnly refresh cookies, we would hit /refresh or /me
      // to re-establish the session on mount.
      // For this step, we assume the user must login to get the memory token.
      setLoading(false);
    };

    initAuth();
  }, [setLoading]);

  const login = async (input: any) => {
    setLoading(true);
    try {
      const { user } = await authService.login(input);
      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (input: any) => {
    setLoading(true);
    try {
      const { user } = await authService.register(input);
      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
      setLoading(false);
      router.push("/login");
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
};
