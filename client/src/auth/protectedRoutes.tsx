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
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    showNotification("warning", "Please, Login to continue");
    router.push("/login");
    return;
  }

  console.log(user.role, "user role");

  if (!allowedRoles.includes(user.role)) {
    showNotification("error", "Access Denied");
    router.back();
    return;
  }

  return <Outlet />;
};
