import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/candidate/settings")({
  component: RouteComponent,
});
function RouteComponent() {
  return <div> setting </div>;
}
