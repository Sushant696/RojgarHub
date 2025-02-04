import PostJob from "@/pages/employer/postJob";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/postJob")({
  component: PostJob,
});
