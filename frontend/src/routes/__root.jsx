import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="sticky top-0 overflow-hidden">
          <Navbar />
        </div>
        <div className="max-h-screen p-10">
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  ),
});
