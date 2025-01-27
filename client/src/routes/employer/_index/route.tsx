import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/_index")({
  
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello this is dashboard content</div>;
}
