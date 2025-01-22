import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoutes } from "../../auth/protectedRoutes";

export const Route = createFileRoute("/employer/settings")({
  component: () => {
    <ProtectedRoutes allowedRoles={["EMPLOYER"]}>
      <h1>Employer settings component</h1>
    </ProtectedRoutes>;
  },
});
