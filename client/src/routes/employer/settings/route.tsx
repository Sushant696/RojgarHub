import { createFileRoute } from "@tanstack/react-router";
import { useTest } from "../../../hooks/auth";

export const Route = createFileRoute("/employer/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const response = useTest();
  console.log(response);
  return <div>Hello "/employer/settings"!</div>;
}
