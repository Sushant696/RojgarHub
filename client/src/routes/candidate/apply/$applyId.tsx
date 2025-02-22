import ApplyJob from "@/pages/candidate/applyJob";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/candidate/apply/$applyId")({
  component: ApplyJob,
});
