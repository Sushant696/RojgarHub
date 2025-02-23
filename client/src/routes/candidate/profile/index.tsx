import Profile from "@/pages/candidate/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/candidate/profile/")({
  component: Profile,
});
