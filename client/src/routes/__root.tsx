import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PublicLayout from "../layouts/publicLayout";
import AuthProvider from "../auth/authProvider";

const queryClient = new QueryClient();
const LayoutWrapper = () => {
  return (
    <>
      <AuthProvider /> 
      <PublicLayout />
    </>
  );
};

export const Route = createRootRoute({
  notFoundComponent: () => {
    return <p>Not found bro make a custom component for this</p>;
  },

  component: () => (
    <QueryClientProvider client={queryClient}>
      <LayoutWrapper />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
});
