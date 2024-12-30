import { User, UserRole } from "../types/auth";

export const authService = {
  user: null as User | null,

  checkAuth() {
    const token = localStorage.getItem("");
    // validate the token and get the data of the user here
    return !token;
  },

  getUserRole(): UserRole | null {
    return this.user?.role || null;
  },
};
