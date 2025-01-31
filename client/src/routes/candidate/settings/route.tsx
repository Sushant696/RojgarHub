import { createFileRoute } from "@tanstack/react-router";
import { useTest } from "../../../hooks/auth";

export const Route = createFileRoute("/candidate/settings")({
  component: RouteComponent,
});
function RouteComponent() {
  const response = useTest();
  return <div> setting {response.data?.data.message}</div>;
}
