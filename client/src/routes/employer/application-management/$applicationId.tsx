import ApplicationDetails from "@/components/employer/applicationDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/employer/application-management/$applicationId",
)({
  component: ApplicationDetails,
});
