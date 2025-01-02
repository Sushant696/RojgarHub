import { create } from "zustand";
import { authApi } from "../api/user";
type UserRole = "employer" | "candidate";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  role: UserRole;
  email: string;
  contact: string;
  username: string;
}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  token: string | null;
  login: (phoneNo: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      token: null,

      login: async (phoneNo, password) => {
        const response = await authApi.Login({ phoneNo, password });
        if (response.data?.user) {
          set({
            user: response.data.user,
            isAuthenticated: true,
            token: response.data.accessToken,
            isLoading: false,
          });
        }
        set({ isLoading: false });
        return response;
      },

      logout: async () => {
        set({ user: null, isAuthenticated: false });
      },

      getCurrentUser: async () => { },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
