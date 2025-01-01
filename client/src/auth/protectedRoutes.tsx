// when user tries to access a protected route check if the user is authenticated or not
// if yes then check if he has permissions to do so (roles) || if not then redirect to login page
// if yes then redirect to where used wanted to go previously || if not then show error message you don't have enough permissoin to do so

import { Outlet } from "@tanstack/react-router";
import useRouter from "../lib/router";
import { UserRole } from "../types/auth";
import showNotification from "../utils/toastify";


interface ProtectedRoutesProps {
  allowedRoles: UserRole[];
}

export const ProtectedRoutes = ({ allowedRoles }: ProtectedRoutesProps) => {
  const router = useRouter();
  // auth check
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    <h1>loading</h1>;
  }

  if (!isAuthenticated || !user) {
    return router.push("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    showNotification("error", "Sorry, you are not eligible for the operation");
  }

  return <Outlet />;
};
