import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useAuthStore from "../stores/authStore";
import { EmployerLayout } from "../layouts/EmployerLayout";
import { CandidateLayout } from "../layouts/candidateLayout";
import PublicLayout from "../layouts/publicLayout";

const queryClient = new QueryClient();

const LayoutWrapper = () => {
  const user = useAuthStore((state) => state.user);

  if (user?.role === "employer") {
    return <EmployerLayout />;
  } else if (user?.role === "candidate") {
    return <CandidateLayout />;
  } else {
    return <PublicLayout />;
  }
};

export const Route = createRootRoute({
  notFoundComponent: () => {
    return <p>Not found bro make a custom component for this </p>;
  },

  component: () => (
    <QueryClientProvider client={queryClient}>
      {/* Use the wrapper component to handle layout */}
      <LayoutWrapper />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});
