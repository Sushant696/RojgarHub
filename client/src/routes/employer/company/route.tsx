import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/company")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/employer/company"!</div>;
}
