import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Employer Settings</div>;
}
