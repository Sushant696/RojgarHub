import { create } from "zustand";
import { authApi } from "../api/user";
type UserRole = "employer" | "candidate";

interface User {
  id: string;
  role: UserRole;
  email: string;
  contact: string,
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthMethod {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthMethod>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (phoneNo: string, password: string) => {
    const response = await authApi.Login({ phoneNo, password });
    console.log(response?.data?.user)
    if (response.data?.user) {
      set({ user: response.data?.user, isAuthenticated: true });
    }

    return response;
  },
  logout: async () => {
    console.log("user logged in");
  },
  getCurrentUser: async () => { },
}));

export default useAuthStore;
