import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoutes } from "../../auth/protectedRoutes";

export const Route = createFileRoute("/candidate/viewJobs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoutes allowedRoles={["CANDIDATE"]}>
      <h1>hello</h1>
    </ProtectedRoutes>
  );
}
