import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "../components/footer";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="sticky top-0 z-50 overflow-hidden">
          <Navbar />
        </div>
        <div className="">
          <Outlet />
        </div>
        <div className="mt-20">
          <Footer />
        </div>
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  ),
});
