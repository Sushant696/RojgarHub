import useRouter from "../lib/router";
import { UserRole } from "../types/auth";
import useAuthStore from "../stores/authStore";
import { Outlet } from "@tanstack/react-router";
import showNotification from "../utils/toastify";

interface ProtectedRoutesProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const ProtectedRoutes = ({
  children,
  allowedRoles,
}: ProtectedRoutesProps) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  // if authenticated
  if (!isAuthenticated || !user) {
    router.push("/login");
    return null;
  }

  // if eligible
  if (!allowedRoles.includes(user.role)) {
    showNotification("error", "Sorry, you are not eligible for the operation");
    router.push("/login");
    return null;
  }
  return <>{children ?? <Outlet />}</>;
};
