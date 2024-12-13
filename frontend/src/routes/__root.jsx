import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="sticky top-0 overflow-hidden">
        <Navbar />
      </div>
      <div className="max-h-screen p-10">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});

// we can just extract the url or the currently active form from the pathname and then render which is currently active and render the slidingform component which will have the  sliding animation logic in both /login and /register routes
