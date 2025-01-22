import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dynamic/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/candidate/settings"!</div>;
}
