import { useEffect, useState } from "react";
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
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Only proceed if auth state is not loading
    if (!authLoading) {
      if (!hasNavigated) {
        if (!isAuthenticated || !user) {
          setHasNavigated(true);
          showNotification("warning", "Please, Login to continue");
          router.push("/");
          return;
        }
        if (!allowedRoles.includes(user.role)) {
          setHasNavigated(true);
          showNotification("error", "Access Denied");
          router.push("/");
          return;
        }
      }
    }
  }, [isAuthenticated, user, allowedRoles, router, hasNavigated, authLoading]);

  // Show nothing while auth state is loading or conditions aren't met
  if (
    authLoading ||
    !isAuthenticated ||
    !user ||
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return <>{children}</>;
};
