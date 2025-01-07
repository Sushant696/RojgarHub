import { create } from "zustand";
import { authApi } from "../api/user";
type UserRole = "employer" | "candidate";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  role: UserRole;
  contact: string;
}
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  login: (phoneNo: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setIsAuthenticated: (status: boolean) => void;
  setCurrentuser: (user: User | null) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      token: null,

      setAccessToken: (token) => {
        set({ accessToken: token });
      },
      setIsAuthenticated: (status) => {
        set({ isAuthenticated: status });
      },

      login: async (phoneNo, password) => {
        const response = await authApi.Login({ phoneNo, password });
        if (response.data?.user) {
          set({
            user: response.data.user,
            isAuthenticated: true,
            accessToken: response.data.accessToken,
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
