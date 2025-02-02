import Candidates from "@/pages/employer/candidates";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/candidates")({
  component: Candidates,
});
