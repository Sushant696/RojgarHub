import { create } from "zustand";
import { authApi } from "../api/user";
import { persist } from "zustand/middleware";
import { UserRole } from "../types/auth";

interface User {
  id: string;
  role: UserRole;
  contact: string;
}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNo: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setIsAuthenticated: (status: boolean) => void;
  setCurrentuser: (user: User | null) => Promise<void>;
  setIsLoading: (status: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setIsAuthenticated: (status) => {
        set({ isAuthenticated: status });
      },

      setIsLoading: (status) => {
        set({ isLoading: status });
      },

      login: async (phoneNo, password) => {
        const response = await authApi.Login({ phoneNo, password });
        if (response.data?.user) {
          set({
            user: response.data.user,
            isAuthenticated: true,
          });
        }
        return response;
      },

      setCurrentuser: async (currUser) => {
        set({ user: currUser });
      },
      logout: async () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
