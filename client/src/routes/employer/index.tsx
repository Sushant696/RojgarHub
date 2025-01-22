import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoutes } from "../../auth/protectedRoutes";
import { EmployerLayout } from "../../layouts/EmployerLayout";

export const Route = createFileRoute("/employer/")({
  component: () => (
    <ProtectedRoutes allowedRoles={["EMPLOYER"]}>
      <EmployerLayout />
    </ProtectedRoutes>
  ),
});
