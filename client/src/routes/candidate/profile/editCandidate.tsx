import EditProfileForm from "@/components/candidate/ProfileEdit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/candidate/profile/editCandidate")({
  component: EditProfileForm,
});
