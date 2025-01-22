import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoutes } from "../../auth/protectedRoutes";

export const Route = createFileRoute("/employer/postJob")({
  component: () => {
    <ProtectedRoutes allowedRoles={["EMPLOYER"]}>
      <h1>Post a job component</h1>
    </ProtectedRoutes>;
  },
});
