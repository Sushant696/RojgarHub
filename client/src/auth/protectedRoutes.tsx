import useRouter from "../lib/router";
import { UserRole } from "../types/auth";
import useAuthStore from "../stores/authStore";
import showNotification from "../utils/toastify";

interface ProtectedRoutesProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const ProtectedRoutes = ({
  allowedRoles,
  children,
}: ProtectedRoutesProps) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    showNotification("warning", "Please, Login to continue");
    router.push("/login");
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    showNotification("error", "Access Denied");

    router.back();
    return null;
  }

  return <>{children}</>;
};
