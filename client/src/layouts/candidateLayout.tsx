import { Outlet } from "@tanstack/react-router";

import { useLogout } from "../hooks/auth";
import useAuthStore from "../stores/authStore";
import { useGetCandidateById } from "@/hooks/candidate";
import Loading from "@/components/isLoading";
import { useEffect } from "react";

export const CandidateLayout = () => {
  const { setAuthenticatedUser } = useAuthStore();
  const { data, isLoading } = useGetCandidateById();

  useEffect(() => {
    if (data?.candidate) {
      setAuthenticatedUser(data?.candidate);
    }
  }, [data, setAuthenticatedUser]);

  const logout = useLogout();
  if (logout.isPending) {
    return <h1 className="min-h-screen mx-0 ">Loading...</h1>;
  }
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen">
      <div className="flex-1 py-8 border">
        <main className="container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
