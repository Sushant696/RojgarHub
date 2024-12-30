import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "../utils/auth";
import { JobSeekerLayout } from "../layouts/JobSeekerLayout";
import { EmployerLayout } from "../layouts/EmployerLayout";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ location }) => {
    if (!authService.checkAuth) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: () => {
    const { data: user } = useQuery({
      queryKey: ["user"],
      queryFn: () => authService.user,
    });

    if (user?.role === "jobSeeker") {
      return <JobSeekerLayout />;
    }

    if (user?.role === "employer") {
      return <EmployerLayout />;
    }

    throw redirect({ to: "/login" });
  },
});
