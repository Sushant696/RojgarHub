import useRouter from "../lib/router";
import { UserRole } from "../types/auth";
import useAuthStore from "../stores/authStore";
import { Outlet } from "@tanstack/react-router";
import showNotification from "../utils/toastify";

interface ProtectedRoutesProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ allowedRoles }: ProtectedRoutesProps) => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  // if authenticated
  if (!isAuthenticated || !user) {
    showNotification("warning", "Please, Login to continue");

    router.push("/login");
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    logout();
    router.push("/login");
    return null;
  }

  return <>{<Outlet />}</>;
};
