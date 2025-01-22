import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoutes } from "../../auth/protectedRoutes";

export const Route = createFileRoute("/candidate/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoutes allowedRoles={["CANDIDATE"]}>
      <h1>Hello dashboard</h1>
    </ProtectedRoutes>
  );
}
