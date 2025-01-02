import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useAuthStore from "../stores/authStore";
import { EmployerLayout } from "../layouts/EmployerLayout";
import { CandidateLayout } from "../layouts/candidateLayout";
import PublicLayout from "../layouts/publicLayout";

const queryClient = new QueryClient();

const user = useAuthStore.getState().user;

export const Route = createRootRoute({
  notFoundComponent: () => {
    return <p>Not found bro make and custom component for this </p>;
  },

  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        {(() => {
          switch (user?.role) {
            case "employer":
              return <EmployerLayout />;
            case "candidate":
              return <CandidateLayout />;
            default:
              return <PublicLayout />;
          }
        })()}
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  ),
});
