import EmployerMobileView from "@/components/employer/mobileLayout";
import EmployerLayoutDesktop from "@/components/employer/EmployerDesktopView";
import { useGetEmployerById } from "@/hooks/employer";
import Loading from "@/components/isLoading";
import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";

export const EmployerLayout = () => {
  const { setAuthenticatedUser } = useAuthStore();
  const { data, isLoading } = useGetEmployerById();
  useEffect(() => {
    if (data?.employer) {
      setAuthenticatedUser(data?.employer);
    }
  }, [data, setAuthenticatedUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-h-screen">
      <div>
        <EmployerMobileView />
      </div>
      <div className="">
        <EmployerLayoutDesktop />
      </div>
    </div>
  );
};
