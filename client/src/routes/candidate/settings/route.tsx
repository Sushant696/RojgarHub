import { createFileRoute } from "@tanstack/react-router";
import { useTest } from "../../../hooks/auth";

export const Route = createFileRoute("/candidate/settings")({
  component: RouteComponent,
});
function RouteComponent() {
  const response = useTest();
  console.log(response?.data?.data?.message);
  return <div> setting {response.data?.data.message}</div>;
}
